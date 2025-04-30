import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export const extractText = async (file, docType) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('doc_type', docType);

  try {
    const response = await axios.post(`${API_BASE}/extract/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (response.data.success) {
      return {
        rawText: response.data.raw_text,
        structuredData: response.data.structured_data,
        docType: response.data.doc_type
      };
    }
    throw new Error(response.data.error || 'Extraction failed');
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};

export const exportToExcel = async (structuredData, docType) => {
  try {
    // Load xlsx library dynamically
    const XLSX = await import('xlsx');
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    
    // 1. Add Items Sheet (if exists)
    if (structuredData.items && Array.isArray(structuredData.items)) {
      const itemsSheet = XLSX.utils.json_to_sheet(structuredData.items);
      XLSX.utils.book_append_sheet(workbook, itemsSheet, "Items");
    }
    
    // 2. Add Summary Sheet
    const summaryData = {};
    Object.entries(structuredData).forEach(([key, value]) => {
      if (key !== 'items') summaryData[key] = value;
    });
    
    const summarySheet = XLSX.utils.json_to_sheet([summaryData]);
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
    
    // 3. Generate filename
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T-]/g, '');
    const filename = `export_${docType}_${timestamp}.xlsx`;
    
    // 4. Save file
    XLSX.writeFile(workbook, filename);
    
    return { success: true, filename };
    
  } catch (error) {
    console.error("Excel Export Error:", error);
    throw new Error("Failed to generate Excel file. Please try again.");
  }
};