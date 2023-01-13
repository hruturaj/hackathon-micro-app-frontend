import XLSX from "sheetjs-style";

export const exportFile = (data) => {
  const table: any = [];

  data.forEach((row) => {
    table.push({
      "Domain Name": row?.DomainMaster.name,
      "Skill Name": row?.Skill.name,
      "Skill Level": row?.skillLevel,
      "Years of Experience": row?.YOE,
    });
  });
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(table, {
    header: ["Domain Name", "Skill Name", "Skill Level", "Years of Experience"],
  });
  const wscols = [
    { width: 20 }, // first column
    { width: 20 }, // second column
    { width: 20 },
    { width: 20 },
  ];
  ws["!cols"] = wscols;
  const cellStyle = {
    // set the style for target cell
    font: {
      bold: true,
    },
    alignment: {
      vertical: "center",
      horizontal: "center",
      wrapText: true,
    },
  };
  ws["A1"].s = cellStyle;
  ws["B1"].s = cellStyle;
  ws["C1"].s = cellStyle;
  ws["D1"].s = cellStyle;

  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb, "SheetJSReactUserSkillList.xlsx");
};

export const checkUserLoggedIn = () => {
  const userToken = localStorage.getItem("token");
  if (
    userToken !== null &&
    userToken !== undefined &&
    String(userToken).trim() !== ""
  ) {
    return true;
  } else {
    return false;
  }
};
