import * as XLSX from "xlsx";

export default function ExportButton({ tableData }) {
  const handleExport = () => {
    if (!tableData.length) return;

    // Convert JSON data to Excel format
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Extracted Data");

    XLSX.writeFile(wb, "Extracted_Data.xlsx");
  };

  return (
    <button onClick={handleExport} className="mt-4 bg-green-500 px-4 py-2 text-black font-bold rounded-lg hover:bg-green-700 transition">
      Export to Excel
    </button>
  );
}
