from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
import pytesseract
from PIL import Image
from pdf2image import convert_from_bytes
from io import BytesIO
import google.generativeai as genai
import json
import os
from dotenv import load_dotenv
import pandas as pd

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')

PROMPT_TEMPLATES = {
    "bill": "Extract bill details including vendor, date, items (name, quantity, price), and total amount. Return only valid JSON.",
    "invoice": "Extract invoice details including number, date, items, subtotal, tax, and total. Return only valid JSON.",
    "receipt": "Extract receipt details including merchant, date, items, and total. Return only valid JSON.",
    "generic": "Extract key information from this document in structured JSON format."
}

def extract_text_from_file(file_bytes: bytes, content_type: str) -> str:
    """Extract text from image or PDF"""
    try:
        if content_type == 'application/pdf':
            images = convert_from_bytes(file_bytes)
            return "\n".join(pytesseract.image_to_string(img) for img in images)
        else:
            img = Image.open(BytesIO(file_bytes))
            return pytesseract.image_to_string(img)
    except Exception as e:
        raise HTTPException(400, f"Text extraction failed: {str(e)}")

def parse_gemini_response(response_text: str) -> dict:
    """Safely parse Gemini response"""
    try:
        # Remove markdown code blocks if present
        cleaned_text = response_text.replace('```json', '').replace('```', '').strip()
        return json.loads(cleaned_text)
    except json.JSONDecodeError:
        raise HTTPException(500, "Failed to parse Gemini response")

@app.post("/extract/")
async def extract_text_endpoint(
    file: UploadFile = File(...),
    doc_type: str = Form(...)
):
    try:
        # Validate document type
        if doc_type not in PROMPT_TEMPLATES:
            raise HTTPException(400, "Invalid document type")

        # Process uploaded file
        file_bytes = await file.read()
        extracted_text = extract_text_from_file(file_bytes, file.content_type)

        # Generate prompt
        prompt = f"{PROMPT_TEMPLATES[doc_type]}\n\nRaw text:\n{extracted_text}"

        # Get Gemini response
        response = model.generate_content(prompt)
        
        if not response.text:
            raise HTTPException(500, "Empty response from Gemini")
        
        structured_data = parse_gemini_response(response.text)

        return JSONResponse({
            "success": True,
            "raw_text": extracted_text,
            "structured_data": structured_data,
            "doc_type": doc_type
        })

    except HTTPException as he:
        return JSONResponse(
            status_code=he.status_code,
            content={"success": False, "error": str(he.detail)}
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": f"Processing failed: {str(e)}"}
        )

@app.post("/export/")
async def export_to_excel(
    structured_data: dict,
    doc_type: str
):
    try:
        # Create Excel file in memory
        output = BytesIO()
        
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            if "items" in structured_data:
                pd.DataFrame(structured_data["items"]).to_excel(
                    writer, sheet_name="Items", index=False
                )
            pd.DataFrame.from_dict({
                k: [v] for k, v in structured_data.items() 
                if k != "items"
            }).to_excel(writer, sheet_name="Summary", index=False)
        
        output.seek(0)
        return StreamingResponse(
            output,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={
                "Content-Disposition": f"attachment; filename={doc_type}_data.xlsx"
            }
        )
    except Exception as e:
        raise HTTPException(500, f"Excel export failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)