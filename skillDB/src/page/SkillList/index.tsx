import React, { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import UsersActions from "../../components/DataTable/components/UsersActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axiosRequest from "../../services/http.service";
import {exportFile} from '../../utils';
import "./index.scss";

const SkillList = () => {
  const [rowId, setRowId] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleAdd = () => {
    navigate("/skill/list/new");
  };

  useEffect(() => {
    setLoading(true);
    axiosRequest
      .get("/skill", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
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
    <div className="skillListContainer">
      <div className="buttonContainer">
        <Button variant="contained" onClick={()=> exportFile(rows)} >
          Download
        </Button>
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </div>
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
