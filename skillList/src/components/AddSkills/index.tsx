import Autocomplete from "@mui/material/Autocomplete";
import "../AddSkills/addskills.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { getAllSkills } from "../../services/skills-lib";

const skillLevel = ["Basic", "Intermediate", "Expert"];

function AddSkills({
  domainSet,
  skillSet,
  updateFn,
  index,
  userSelectedValues,
}) {
  const initialValues: any = {
    domainMasterId: undefined,
    skillId: undefined,
    skillLevel: "",
    YOE: undefined,
  };

  const [skillForm, setSkillForm] = useState(initialValues);
  const [skillFormErrors, setSkillFormErrors] = useState({
    domain: "",
    skills: "",
    level: "",
    experience: "",
  });
  const [skillsSet, setskillsSet] = useState([]);
  const [currentDomain, setCurrentDomain] = useState(undefined);

  useEffect(() => {
    updateFn(skillForm, index);
  }, [skillForm]);

  const submitSkillsForm = (event: any) => {
    event.preventDefault();
  };

  const validateForm = (name: string, value: any) => {
    const errors = skillFormErrors;
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

  const deleteSkillRow = () => {
    updateFn(skillForm, index, true);
  };

  return (
    <div className="main-form" style={index === 0 ? {} : {}}>
      <Autocomplete
        key={`combo-box-demo-${index}`}
        id={`combo-box-demo-${index}`}
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
        key={`skill-box-${index}`}
        id={`skill-box-${index}`}
        sx={{ width: 250 }}
        options={skillsSet}
        onChange={(event: any, newVal: any, reason: any) => {
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
        //   const valDomains = userSelectedValues.map((val) => val.skills.name);
        //   return valDomains.indexOf(option.name) !== -1;
        //   // return allSelectedDomains.map(val => val.domain).filter(value => value.id !== option.id);
        // }}
        disabled={skillForm.domainMasterId === undefined}
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
        key={`level-box-${index}`}
        id={`level-box-${index}`}
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
        key={`exp-field-${index}`}
        id={`exp-field-${index}`}
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

      {index !== 0 ? (
        <CancelIcon onClick={deleteSkillRow} />
      ) : (
        <div style={{ width: 24 }}></div>
      )}
      {/* </form> */}
    </div>
  );
}

export default AddSkills;
