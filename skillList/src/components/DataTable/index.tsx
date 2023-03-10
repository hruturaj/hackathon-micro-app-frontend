import React, { useEffect, useState } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";

const DataTable = ({
  columnsData,
  rowsData,
  onCellEditCommitCallback,
  loading,
}) => {
  const rpp = 7;
  return (
    <div
      style={{
        width: "100%",
        background: "none",
        margin: "auto",
        marginTop: 24,
        height: 111 + rpp * 52 + (rpp - 1) * 10 + "px",
      }}
    >
      <DataGrid
        loading={loading}
        columns={[...columnsData]}
        rows={rowsData}
        getRowId={(row) => row?.id}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? grey[200] : grey[900],
          },
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
        }}
        onCellEditCommit={(params) => {
          onCellEditCommitCallback(params);
        }}
        disableSelectionOnClick
        pageSize={rpp}
        autoPageSize
      />
    </div>
  );
};

export default DataTable;
