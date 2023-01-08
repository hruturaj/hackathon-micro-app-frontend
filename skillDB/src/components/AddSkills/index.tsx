import Autocomplete from "@mui/material/Autocomplete";
import '../AddSkills/addskills.scss'
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import axiosRequest from "../../services/http.service";
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
function AddSkills({domainSet, skillSet, updateFn, index, userSelectedValues}) {
  // const domainSet: any = [];
  const allSkills: any = [];
  const initialValues: {
    domain: { name: string; id: number };
    skills: { name: string; id: number, domainMasterId: number };
    level: string;
    experience: number;
  } = {
    domain: { name: "", id: -1 },
    skills: { name: "", id: -1, domainMasterId: -1 },
    level: "",
    experience: 0,
  };

  const [skillForm, setSkillForm] = useState(initialValues);
  const [skillFormErrors, setSkillFormErrors] = useState({
    domain: "",
    skills: "",
    level: "",
    experience: "",
  });
  const [skillsSet, setskillsSet] = useState([])

  useEffect(() => {
    console.log('useeffect add skills child',skillForm, index)
    updateFn(skillForm, index);
  }, [skillForm]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    console.log(name, value);
    validateForm(name, value);
    setSkillForm((prevState) => ({
      ...prevState,
      [name]: name === 'experience' ? +value : value,
    }));
    // allSkills.filter(val => {
    //   val.domainMasterId === 
    // })
  };

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
    if(skillForm.domain) {
      const newskillarray = skillSet.filter((val: any) => {
        return val.domainMasterId === skillForm.domain.id
      })
      return newskillarray
    } else {
      return []
    }
  }

  const deleteSkillRow = () => {
    updateFn(skillForm, index, true)
  }

  return (
      <div className="main-form" style={index === 0? {
        right: '17px',
        position: 'relative'
      } : {}}>
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
            onChange={(event: any, newVal: any, reason: any) => {
              if(reason === 'clear'){
                setSkillForm(initialValues);
              } else {
                setSkillForm((prevState) => ({
                  ...prevState,
                  domain: newVal,
                }));
              }
            }}
            value={skillForm.domain}
            getOptionLabel={(option) => option.name}
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
            sx={{ width: 250 }}
            options={filterSkillset()}
            onChange={(event: any, newVal: any, reason: any) => {
              if(reason === 'clear'){
                setSkillForm({
                  ...skillForm,
                  skills: initialValues.skills
                });
              } else {
              setSkillForm({
                ...skillForm,
                skills: newVal,
              });
            }
            }}
            getOptionDisabled={(option: any) => {
              // console.log(option);
              const valDomains = userSelectedValues.map((val) => val.skills.name);
              // console.log('disabled option',valDomains, valDomains.indexOf(option.name) !== -1, option.name)
              return valDomains.indexOf(option.name) !== -1;
              // return allSelectedDomains.map(val => val.domain).filter(value => value.id !== option.id);
            }}
            disabled={skillForm.domain?.name === ''}
            value={skillForm.skills}
            getOptionLabel={(option) => option.name}
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
                level: newVal,
              });
            }}
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
            //   onBlur={handleChange}
            onChange={handleChange}
            value={skillForm.experience}
            placeholder="Experience"
            label="Experience"
            variant="outlined"
            error={skillFormErrors.experience.length > 0}
            helperText={skillFormErrors.experience}
          />

          { index !== 0 ? <CancelIcon onClick={deleteSkillRow} /> : null}
        {/* </form> */}
      </div>
  );
}

export default AddSkills;
