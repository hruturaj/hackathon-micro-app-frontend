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
import { useSnackbar } from "notistack";
import { getAllDomains, getAllSkills } from "../../../services/skills-lib";

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
  const skillLevelOptions = ["Basic", "Intermediate", "Expert"];
  const [errorValues, seterrorValues] = useState({
    domainError: "",
    skillsError: "",
    experience: "",
    level: "",
  });
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setselectedDomain] = useState<any>({
    ...params?.row?.DomainMaster,
    id: params?.row?.domainMasterId,
  });
  const [selectedSkill, setSelectedSkill] = useState<any>({
    ...params?.row?.Skill,
    id: params?.row?.skillId,
  });
  const [selectedLevel, setSelectedLevel] = useState(params?.row?.skillLevel);
  const [selectedYOE, setSelectedYOE] = useState(params?.row?.YOE);
  const [domainLoading, setDomainLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skillsSet, setskillsSet] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    setDomainLoading(true);
    getAllDomains()
      .then((res: any) => {
        setDomains(res.data.data);
      })
      .finally(() => {
        setDomainLoading(false);
      });

    getAllSkills(selectedDomain?.id)
      .then((res) => {
        setskillsSet(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    if (
      errorValues?.domainError?.length !== 0 ||
      errorValues?.skillsError?.length !== 0 ||
      errorValues?.experience?.length !== 0 ||
      errorValues?.level?.length !== 0
    ) {
      return;
    }
    setLoading(true);
    axiosRequest
      .put(
        `/user-skill/${params?.row?.id}`,
        {
          skillLevel: selectedLevel,
          YOE: Number(selectedYOE),
          userId: Number(localStorage.getItem("user")),
          domainMasterId: Number(selectedDomain?.id),
          skillId: Number(selectedSkill?.id),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        if (res?.status < 400) {
          tableLoading(true);
          axiosRequest
            .get("/user-skill", {
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
          <b>Update selected skill</b>
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
              defaultValue={selectedDomain}
              loading={domainLoading}
              size="small"
              disabled={loading}
              getOptionDisabled={(option: any) =>
                option?.name === selectedDomain?.name
              }
              onChange={(e, value) => {
                seterrorValues({
                  ...errorValues,
                  domainError: "",
                  skillsError: "Please select skill",
                });
                setselectedDomain(value);
                setSelectedSkill(null);
                getAllSkills(value?.id)
                  .then((res) => {
                    setskillsSet(res?.data?.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
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

            <Autocomplete
              options={skillsSet}
              onChange={(event: any, newVal: any, reason: any) => {
                seterrorValues({
                  ...errorValues,
                  skillsError: "",
                });
                setSelectedSkill(newVal);
              }}
              size="small"
              value={selectedSkill}
              defaultValue={selectedSkill}
              loading={skillsSet.length === 0}
              getOptionLabel={(option: any) => option?.name}
              disableClearable
              renderInput={(params) => (
                <TextField
                  name="skills"
                  {...params}
                  label="Skills"
                  placeholder="Skills"
                  error={errorValues.skillsError.length > 0}
                  helperText={errorValues.skillsError}
                />
              )}
            />

            <Autocomplete
              size="small"
              id="combo-box-demo"
              options={skillLevelOptions}
              onChange={(event: any, newVal: any) => {
                setSelectedLevel(newVal);
              }}
              disableClearable
              value={selectedLevel}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  name="level"
                  {...params}
                  label="Skill Level"
                  error={errorValues.level.length > 0}
                  helperText={errorValues.level}
                />
              )}
            />

            <TextField
              size="small"
              type="number"
              name="experience"
              onChange={(e) => {
                setSelectedYOE(e.target.value);
              }}
              value={selectedYOE}
              placeholder="Experience"
              label="Experience"
              variant="outlined"
              error={errorValues.experience.length > 0}
              helperText={errorValues.experience}
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
