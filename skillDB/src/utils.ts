// import { read, utils, writeFileXLSX } from 'xlsx';
import XLSX from 'sheetjs-style';

export const exportFile = (data) => {

    const table: any = []

    data.forEach(row => {
        table.push({
            "Domain Name": row.DomainMaster.name,
            "Skill Name": row.name
        })
    })
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(table, { header: ["Domain Name", "Skill Name"] });
    const wscols = [
        { width: 18 },  // first column
        { width: 15 }, // second column
    ];
    ws['!cols'] = wscols
    ws["A1"].s = { // set the style for target cell
        font: {
            bold: true,
        },
    };
    ws["B1"].s = { // set the style for target cell
        font: {
            bold: true,
        },
    };

    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "SheetJSReactAoO.xlsx");
};
export const checkUserLoggedIn = () => {
    const userToken = localStorage.getItem("token");
    if (
        userToken !== null &&
        userToken !== undefined &&
        String(userToken).trim() !== ""
    ) {
        return true
    } else {
        return false
    }
}