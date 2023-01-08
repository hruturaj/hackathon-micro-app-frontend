import Autocomplete from "@mui/material/Autocomplete";
import "../AddSkills/addskills.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import axiosRequest from "../../services/http.service";
import { getAllSkills } from "../../services/skills-lib";
// const skillSet = [
//   { name: "Skill1", id: "1" },
//   { name: "Skill2", id: "2" },
//   { name: "Skill3", id: "3" },
// ];

const skillLevel = ["Basic", "Intermediate", "Expert"];

// const domainSet = [
//   { name: "Tech", id: "1" },
//   { name: "LeaderShip", id: "2" },
//   { name: "Business", id: "3" },
// ];
function AddSkills({
  domainSet,
  skillSet,
  updateFn,
  index,
  userSelectedValues,
}) {
  // const domainSet: any = [];
  const allSkills: any = [];
  const initialValues: any = {
    domainMasterId: null,
    skillId: null,
    skillLevel: "",
    YOE: null,
  };

  const [skillForm, setSkillForm] = useState(initialValues);
  const [skillFormErrors, setSkillFormErrors] = useState({
    domain: "",
    skills: "",
    level: "",
    experience: "",
  });
  const [skillsSet, setskillsSet] = useState([]);
  const [currentDomain, setCurrentDomain] = useState(null);

  useEffect(() => {
    console.log("useeffect add skills child", skillForm, index);
    updateFn(skillForm, index);
  }, [skillForm]);

  const submitSkillsForm = (event: any) => {
    event.preventDefault();
    console.log(skillForm);
  };

  const validateForm = (name: string, value: any) => {
    const errors = skillFormErrors;
    console.log(name, value);
    if (name == "domain") {
      errors.domain = "";
      if (value.length < 1) {
        setSkillFormErrors((prevState) => {
          return {
            ...prevState,
            [name]: "Domain is Required",
          };
        });
      }
    }

    if (name == "skills") {
      errors.skills = "";
      if (value.length < 1) {
        setSkillFormErrors((prevState) => {
          return {
            ...prevState,
            [name]: "Skills Required",
          };
        });
      }
    }

    if (name == "level") {
      errors.level = "";
      if (value.length < 1) {
        setSkillFormErrors((prevState) => {
          return {
            ...prevState,
            [name]: "Skills Level Required",
          };
        });
      }
    }

    if (name == "experience") {
      errors.experience = "";
      if (value.length < 1) {
        setSkillFormErrors((prevState) => {
          return {
            ...prevState,
            [name]: "Exp Required",
          };
        });
      }
    }

    return;
  };

  const filterSkillset = () => {
    console.log(skillForm.domain);
    if (skillForm.domain) {
      const newskillarray = skillSet.filter((val: any) => {
        return val.domainMasterId === skillForm.domain.id;
      });
      return newskillarray;
    } else {
      return [];
    }
  };

  const deleteSkillRow = () => {
    updateFn(skillForm, index, true);
  };

  return (
    <div
      className="main-form"
      style={
        index === 0
          ? {
              right: "17px",
              position: "relative",
            }
          : {}
      }
    >
      {/* <form onSubmit={submitSkillsForm} style={{
          display: "flex",
          justifyContent: "center",
          gap: '10px',
          marginBottom: '10px'
        }}> */}
      <Autocomplete
        id="combo-box-demo"
        options={domainSet}
        sx={{ width: 250 }}
        disableClearable
        onChange={(event: any, newVal: any, reason: any) => {
          setSkillForm((prevState) => ({
            ...prevState,
            domainMasterId: newVal?.id,
          }));
          getAllSkills(newVal?.id)
            .then((res) => {
              setskillsSet(res?.data?.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
        // value={skillForm.domainMasterId}
        getOptionLabel={(option) => {
          return option?.name;
        }}
        renderInput={(params) => (
          <TextField
            name="domain"
            onBlur={(e) => {
              const { name, value } = e.target;
              console.log("domain validate", name, value);
              validateForm(name, value);
            }}
            {...params}
            label="Domain"
            error={skillFormErrors.domain.length > 0}
            helperText={skillFormErrors.domain}
          />
        )}
      />

      <Autocomplete
        sx={{ width: 250 }}
        options={skillsSet}
        onChange={(event: any, newVal: any, reason: any) => {
          console.log("skills", newVal);
          if (reason === "clear") {
            setSkillForm({
              ...skillForm,
              skills: initialValues.skills,
            });
          } else {
            setSkillForm({
              ...skillForm,
              skillId: newVal?.id,
            });
          }
        }}
        // getOptionDisabled={(option: any) => {
        //   // console.log(option);
        //   const valDomains = userSelectedValues.map((val) => val.skills.name);
        //   // console.log('disabled option',valDomains, valDomains.indexOf(option.name) !== -1, option.name)
        //   return valDomains.indexOf(option.name) !== -1;
        //   // return allSelectedDomains.map(val => val.domain).filter(value => value.id !== option.id);
        // }}
        disabled={skillForm.domainMasterId === null}
        // value={skillForm.skillId}
        loading={skillsSet.length === 0}
        getOptionLabel={(option: any) => option?.name}
        disableClearable
        renderInput={(params) => (
          <TextField
            onBlur={(e) => {
              const { name, value } = e.target;
              validateForm(name, value);
            }}
            name="skills"
            {...params}
            label="Skills"
            placeholder="Skills"
            error={skillFormErrors.skills.length > 0}
            helperText={skillFormErrors.skills}
          />
        )}
      />

      <Autocomplete
        id="combo-box-demo"
        options={skillLevel}
        sx={{ width: 250 }}
        onChange={(event: any, newVal: any) => {
          setSkillForm({
            ...skillForm,
            skillLevel: newVal,
          });
        }}
        disableClearable
        value={skillForm.level}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            onBlur={(e) => {
              const { name, value } = e.target;
              validateForm(name, value);
            }}
            name="level"
            {...params}
            label="Skill Level"
            error={skillFormErrors.level.length > 0}
            helperText={skillFormErrors.level}
          />
        )}
      />

      <TextField
        type="number"
        name="experience"
        onChange={(e) => {
          setSkillForm({
            ...skillForm,
            YOE: +e.target.value,
          });
        }}
        value={skillForm.YOE}
        placeholder="Experience"
        label="Experience"
        variant="outlined"
        error={skillFormErrors.experience.length > 0}
        helperText={skillFormErrors.experience}
      />

      {index !== 0 ? <CancelIcon onClick={deleteSkillRow} /> : null}
      {/* </form> */}
    </div>
  );
}

export default AddSkills;
