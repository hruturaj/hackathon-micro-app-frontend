import { Box, CircularProgress, Fab, IconButton } from "@mui/material";
import { green } from "@mui/material/colors";
import { Delete, Save } from "@mui/icons-material";
import React, { useState } from "react";
import axiosRequest from "../../../services/http.service";
import EditModal from "./EditModal";
import { useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";

const UsersActions = ({ params, rowId, setRowId, setRows, setLoading }) => {
  const [deleteloading, setDeleteLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleUpdate = async () => {
    setEditModalVisible(true);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    axiosRequest
      .delete(`/user-skill/${params?.row?.userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res?.status < 400) {
          setLoading(true);
          axiosRequest
            .get("/user-skill", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              if (res?.status < 400) {
                setRows(res?.data?.data);
              }
            })
            .finally(() => {
              setLoading(false);
            });
        }
      })
      .finally(() => {
        enqueueSnackbar("Record Deleted Successfully !", {
          autoHideDuration: 2000,
          key: "deleteRecord",
          variant: "success",
          action: (key) => (
            <IconButton
              onClick={() => closeSnackbar(key)}
              sx={{
                color: "white",
              }}
            >
              <CloseIcon />
            </IconButton>
          ),
        });
        setDeleteLoading(false);
      });
  };

  return (
    <>
      {editModalVisible === true && (
        <EditModal
          key={params.id}
          visible={editModalVisible}
          setVisible={setEditModalVisible}
          params={params}
          setTableData={setRows}
          tableLoading={setLoading}
        />
      )}
      <Box
        sx={{
          m: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          columnGap: "16px",
        }}
      >
        <Fab
          color="primary"
          sx={{
            width: 36,
            height: 36,
          }}
          onClick={handleUpdate}
        >
          <Save sx={{ fontSize: "16px" }} />
        </Fab>
        <Fab
          color="primary"
          sx={{
            width: 36,
            height: 36,
          }}
          disabled={deleteloading}
          onClick={handleDelete}
        >
          <Delete sx={{ fontSize: "16px" }} />
          {deleteloading && (
            <CircularProgress
              size={40}
              sx={{
                color: green[500],
                position: "absolute",
                top: -2,
                left: -2,
                zIndex: 1,
              }}
            />
          )}
        </Fab>
      </Box>
    </>
  );
};

export default UsersActions;
