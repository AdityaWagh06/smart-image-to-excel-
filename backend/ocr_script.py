import pytesseract
from PIL import Image

# Set the correct path to Tesseract (only if needed)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Correct file path (Use raw string or double backslashes)
image_path = r"C:\Users\Asus\cyberpunk-ocr\image4.png"  # ✅ Raw String
# OR
# image_path = "C:\\Users\\Asus\\cyberpunk-ocr\\image4.png"  # ✅ Double Backslashes

# Load image
image = Image.open(image_path)

# Extract text
extracted_text = pytesseract.image_to_string(image)

# Print extracted text
print("Extracted Text:\n", extracted_text)
