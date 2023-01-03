import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
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
function AddSkills() {
  const domainSet: any = [];
  const skillSet: any = [];
  const initialValues: {
    domain: { name: string; id: string };
    skills: { name: string; id: string }[];
    level: string;
    experience: number;
  } = {
    domain: { name: "", id: "" },
    skills: [],
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

  useEffect(() => {
    axiosRequest
      .get("domain", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response: any) => {
        // console.log(response.data.data)
        domainSet.push(...response.data.data);
        console.log(domainSet);
      });
    // axiosRequest.get("skill", { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} }).then((response: any) => {
    //     // console.log(response.data.data)
    //       skillSet.push(...response.data.data);
    //   console.log(skillSet)

    // });

    // console.log(domainSet, skillSet)
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    console.log(name, value);
    validateForm(name, value);
    setSkillForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  return (
    // <Grid
    //   container
    //   spacing={0}
    //   direction="column"
    //   alignItems="center"
    //   justifyContent="center"
    //   style={{ minHeight: "100vh" }}
    // >

    <div>
      <h2 style={{ textAlign: "center" }}>Add Skills</h2>
      <div
        style={{
          // display: "flex",
          justifyContent: "center",
          padding: "50px 0 100px 0",
        }}
      >
        <form onSubmit={submitSkillsForm}>
          <Autocomplete
            id="combo-box-demo"
            options={domainSet}
            sx={{ width: 400 }}
            onChange={(event: any, newVal: any) => {
              setSkillForm((prevState) => ({
                ...prevState,
                domain: newVal,
              }));
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
            sx={{ width: 400 }}
            multiple
            options={skillSet}
            onChange={(event: any, newVal: any) => {
              setSkillForm({
                ...skillForm,
                skills: newVal,
              });
            }}
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
            sx={{ width: 400 }}
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
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </div>
    </div>
    // <h2 style={{ textAlign: "center" }}>Add Skills</h2>

    // </Grid>

    // <Stack gap={5}>
    //   <Stack spacing={2} alignItems="center" sx={{ width: 500 }}>
    //     <Autocomplete
    //     className="auto-complete"
    //       multiple
    //       id="tags-standard"
    //       options={domainSet}
    //       getOptionLabel={(option) => option.name}
    //       renderInput={(params) => (
    //         <TextField
    //           {...params}
    //           variant="standard"
    //           label="Multiple values"
    //           placeholder="Favorites"
    //         />
    //       )}
    //     />
    //   </Stack>
    // </Stack>
  );
}

export default AddSkills;
