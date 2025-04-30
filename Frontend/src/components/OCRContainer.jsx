import { useState } from "react";
import axios from "axios";
import OCRResult from "./OCRResult";
import ExportButton from "./ExportButton";

export default function OCRContainer() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    
    if (uploadedFile && uploadedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(uploadedFile);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/extract/", formData);
      setText(response.data.extracted_text);
    } catch (error) {
      console.error("Error extracting text:", error);
      alert("Error processing file. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-cyberpunk mb-12">Image Text Extractor</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Image Upload */}
          <div className="lg:w-1/3 bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <label className="block mb-4 text-xl font-semibold text-neon">
                  Upload Image
                </label>
                <input 
                  type="file" 
                  onChange={handleFileChange} 
                  accept="image/*"
                  className="block w-full text-sm text-white
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-cyberpunk file:text-black
                    hover:file:bg-neon"
                />
              </div>

              {preview && (
                <div className="mt-4 flex flex-col items-center">
                  <h3 className="text-lg font-medium text-neon mb-2">Image Preview</h3>
                  <img 
                    src={preview} 
                    alt="Uploaded preview" 
                    className="max-w-full h-auto max-h-64 object-contain border-2 border-cyberpunk rounded-lg shadow-lg"
                  />
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className={`w-full py-3 px-4 rounded-lg font-bold transition ${
                  file && !loading
                    ? "bg-cyberpunk text-black hover:bg-neon"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Extract Text"}
              </button>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:w-2/3 bg-gray-800 p-6 rounded-xl shadow-lg">
            <OCRResult text={text} />
            <div className="flex justify-end">
              <ExportButton text={text} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}