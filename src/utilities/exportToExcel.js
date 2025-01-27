import * as XLSX from "xlsx";

export const exportToExcel = (data, fileName, sheetName = "Sheet1") => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("es-ES").replace(/\//g, "-");
  const formattedTime = now
    .toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/:/g, "-");

  const finalFileName = `${fileName}_${formattedDate}_${formattedTime}.xlsx`;
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, finalFileName);
};
