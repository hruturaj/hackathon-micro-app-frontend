import { read, utils, writeFileXLSX } from 'xlsx';


// export const exportFile = () => {




//     const ws = utils.json_to_sheet([
//         { Name: "Bill Clinton", Index: 42 },
//         { Name: "GeorgeW Bush", Index: 43 },
//         { Name: "Barack Obama", Index: 44 },
//         { Name: "Donald Trump", Index: 45 },
//         { Name: "Joseph Biden", Index: 46 }
//     ]);
//     const wb = utils.book_new();
//     utils.book_append_sheet(wb, ws, "Data");
//     writeFileXLSX(wb, "SheetJSReactAoO.xlsx");
// };