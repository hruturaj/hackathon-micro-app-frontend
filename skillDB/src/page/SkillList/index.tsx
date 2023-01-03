import React, { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import UsersActions from "../../components/DataTable/components/UsersActions";
import axios from "axios";
import { dataRequest } from "../../utils";

const SkillList = () => {
  const [rowId, setRowId] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "DomainMaster",
      headerName: "Domain Name",
      flex: 1,
      valueGetter: ({ value }) => {
        return value?.name;
      },
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Skill Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      type: "actions",
      renderCell: (params: any) => (
        <UsersActions {...{ params, rowId, setRowId, setRows, setLoading }} />
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    dataRequest("/skill", { method: "GET" })
      .then((res) => {
        if (res?.status < 400) {
          setRows(res?.data?.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <DataTable
        columnsData={columns}
        rowsData={rows}
        onCellEditCommitCallback={(params: {
          id: React.SetStateAction<null>;
        }) => setRowId(params?.id)}
        loading={loading}
      />
    </div>
  );
};

export default SkillList;
