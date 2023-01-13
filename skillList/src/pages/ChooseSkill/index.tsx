import React, { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import UsersActions from "../../components/DataTable/components/UsersActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axiosRequest from "../../services/http.service";
import "./index.scss";
import { exportFile } from "../../utils";

const ChooseSkill = () => {
  const [rowId, setRowId] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const columns = [
    {
      field: "updatedAt",
      headerName: "Updated At",
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
      field: "Skill",
      headerName: "Skill Name",
      flex: 1,
      valueGetter: ({ value }) => {
        return value?.name;
      },
      align: "center",
      headerAlign: "center",
    },
    {
      field: "YOE",
      headerName: "Experience(Years)",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "skillLevel",
      headerName: "Skill Level",
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
    navigate("/skill/choose/new");
  };

  useEffect(() => {
    setLoading(true);
    axiosRequest
      .get("/user-skill", {
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
    <div className="ChooseSkillContainer">
      <div className="buttonContainer">
        <Button variant="contained" onClick={handleAdd} disabled={loading}>
          Add
        </Button>
        <Button
          variant="contained"
          onClick={() => exportFile(rows)}
          disabled={loading}
        >
          Download
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

export default ChooseSkill;
