export default function OCRResult({ text }) {
    if (!text) return null;
  
    return (
      <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-cyberpunk mb-4">Extracted Text</h2>
        <div className="p-4 bg-gray-700 rounded-lg text-white whitespace-pre-wrap">
          {text}
        </div>
      </div>
    );
  }