import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Autocomplete, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axiosRequest from "../../../services/http.service";
import debounce from "lodash/debounce";
import { useSnackbar } from "notistack";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const EditModal = ({
  visible,
  setVisible,
  params,
  setTableData,
  tableLoading,
}) => {
  const [errorValues, seterrorValues] = useState({
    domainError: "",
    skillsError: "",
  });
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setselectedDomain] = useState<any>(
    params?.row?.DomainMaster
  );
  const [selectedskill, setselectedskill] = useState<any>(params?.row?.name);
  const [domainLoading, setDomainLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    setDomainLoading(true);
    axiosRequest
      .get("domain", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res: any) => {
        setDomains(res?.data?.data);
      })
      .finally(() => {
        setDomainLoading(false);
      });
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  const debounceSearch = React.useRef(
    debounce((value) => {
      axiosRequest
        .get("skill/search/" + selectedDomain?.id + "?search=" + value, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res: any) => {
          if (res.data?.exist) {
            seterrorValues({
              ...errorValues,
              skillsError: "Skill exists",
            });
          } else {
            seterrorValues({
              ...errorValues,
              skillsError: "",
            });
          }
        });
    }, 500)
  );

  const handleSearch = (value: string) => {
    setselectedskill(value);
    debounceSearch.current(value);
  };

  const handleSubmit = () => {
    if (
      errorValues?.domainError?.length !== 0 ||
      errorValues?.skillsError?.length !== 0
    ) {
      return;
    }
    setLoading(true);
    axiosRequest
      .put(
        `skill/${params.id}`,
        { name: selectedskill, domainMasterId: selectedDomain?.id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        if (res?.status < 400) {
          tableLoading(true);
          axiosRequest
            .get("/skill", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              if (res?.status < 400) {
                setTableData(res?.data?.data);
              }
            })
            .finally(() => {
              tableLoading(false);
              enqueueSnackbar("Data Updated Successsfully !", {
                autoHideDuration: 2000,
                key: "updateSkillRecord",
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
            });
        }
      })
      .finally(() => {
        setLoading(false);
        handleClose();
      });
  };

  return (
    <>
      <BootstrapDialog
        id={`editModal-${params?.id}`}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={visible}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <b>Edit</b>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: 32,
              margin: 16,
            }}
          >
            <Autocomplete
              id={`domain-field-${params?.id}`}
              options={domains}
              defaultValue={params?.row?.DomainMaster}
              loading={domainLoading}
              size="small"
              disabled={loading}
              onChange={(e, value) => {
                seterrorValues({
                  ...errorValues,
                  domainError: "",
                });
                setselectedDomain(value);
              }}
              sx={{ width: 400 }}
              disableClearable
              getOptionLabel={(option: any) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Domain"
                  label="Domain"
                  error={errorValues.domainError.length > 0}
                  helperText={errorValues.domainError}
                />
              )}
            />

            <TextField
              id={`skillName-${params?.id}`}
              variant="outlined"
              value={selectedskill}
              sx={{ width: 400 }}
              size="small"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              disabled={loading}
              label="Add Skills"
              error={errorValues.skillsError.length > 0 && selectedskill !== ""}
              helperText={selectedskill == "" ? "" : errorValues.skillsError}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleSubmit}
            variant={"contained"}
            size="small"
            disabled={
              loading ||
              errorValues?.skillsError?.length !== 0 ||
              errorValues?.domainError?.length !== 0
            }
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default EditModal;
