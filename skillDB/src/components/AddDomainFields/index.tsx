import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import axiosRequest from "../../services/http.service";

function AddDomainFields({
  index,
  updateFn,
  domainSet,
  allSelectedDomains,
  setFormErrors,
  setCurrentSkill,
}) {
  const [selectedDomain, setselectedDomain] = useState<any>(null);
  const [selectedskills, setselectedskills] = useState<any>([]);
  const [skillName, setskillName] = useState<any>("");

  const [errorValues, seterrorValues] = useState({
    domainError: "",
    skillsError: "",
  });

  useEffect(() => {
    setFormErrors(errorValues);
  }, [errorValues]);

  // const [formData, setformData] = useState({initialState})

  useEffect(() => {
    if (selectedDomain === null || selectedskills.length === 0) {
      return;
    }
    // console.log("working here******")
    let obj = {
      domain: { id: selectedDomain.id, name: selectedDomain.name },
      skills: selectedskills,
      // .map(each=>{return {id: each.id, name: each.name, domainMasterId: each.domainMasterId}})
    };
    // console.log("******",obj,index)
    updateFn(obj, index);

    console.log("&&&&&&&&&&&&&&&&&&&&&&", allSelectedDomains);
  }, [selectedDomain, selectedskills]);

  const handleChange = (event: any, value?: any, reason?: any) => {
    if (reason === "clear") {
      setselectedDomain({ id: -1, name: "" });
    } else if (event?.target?.id?.includes("domain-field")) {
      seterrorValues({
        ...errorValues,
        domainError: "",
      });
      setselectedDomain(value);
    } else {
      setCurrentSkill(value);
      seterrorValues({
        ...errorValues,
        skillsError: "",
      });

      setskillName(event.target.value);
      if (event?.target?.value?.length > 0) {
        axiosRequest
          .get(
            "skill/search/" +
              selectedDomain?.id +
              "?search=" +
              event.target.value,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response: any) => {
            if (response.data?.exist) {
              seterrorValues({
                ...errorValues,
                skillsError: "Skill exists",
              });
            } else {
              seterrorValues({
                ...errorValues,
                skillsError: "",
              });
              setselectedskills(value);
            }
          });
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: "15px",
        columnGap: 20,
        rowGap: 20,
        flexWrap: "wrap",
      }}
    >
      <Autocomplete
        id="domain-field"
        options={domainSet}
        size="small"
        onChange={(e, v, reason) => {
          handleChange(e, v, reason);
        }}
        sx={{ minWidth: 200, flex: 0.35 }}
        getOptionDisabled={(option: any) => {
          const valDomains = allSelectedDomains.map((val) => val.domain.name);
          return valDomains.indexOf(option.name) !== -1;
        }}
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
        multiple
        key={`skills-${index}`}
        id={`skills-${index}`}
        options={[]}
        freeSolo
        size="small"
        sx={{ minWidth: 200, flex: 0.35 }}
        onChange={(e, v, reason) => {
          console.log("onchange", e, v, reason);
          handleChange(e, v, reason);
        }}
        // renderTags={(value: readonly string[], getTagProps) =>
        //   value.map((option: string, index: number) => (
        //     <Chip
        //       variant="outlined"
        //       label={option}
        //       size="small"
        //       // color={errorValues.skillsError?.length > 0 ? "error" : "default"}
        //       {...getTagProps({ index })}
        //     />
        //   ))
        // }
        onKeyDown={(event: any) => {
          if (selectedDomain === null) {
            event.defaultMuiPrevented = selectedDomain === null;
            seterrorValues({
              ...errorValues,
              domainError: "Please select Domain",
            });
            return;
          }
          if (event.key === "Enter") {
            event.defaultMuiPrevented = errorValues.skillsError.length > 0;
            return;
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Add Skills"
            error={errorValues.skillsError.length > 0 && skillName !== ""}
            helperText={skillName == "" ? "" : errorValues.skillsError}
          />
        )}
      />
    </div>
  );
}

export default AddDomainFields;
