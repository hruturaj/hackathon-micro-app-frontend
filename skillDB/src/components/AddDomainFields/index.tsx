import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import axiosRequest from "../../services/http.service";

function AddDomainFields({ index, updateFn, domainSet, allSelectedDomains }) {
  //   const domainSet = [];
  //   const skillSet = []
  // const results = domainSet.filter(({ value: id1 }) => !allSelectedDomains.some(({ value: id2 }) => id2 === id1));
  // console.log('difference---------------------',results)

  const [selectedDomain, setselectedDomain] = useState<any>(null);
  const [selectedskills, setselectedskills] = useState<any>([]);
  const [skillName, setskillName] = useState<any>("");

  const [errorValues, seterrorValues] = useState({
    domainError: "",
    skillsError: "",
  });

  // const [formData, setformData] = useState({initialState})

  useEffect(() => {
    if (selectedDomain == null) {
      return;
    }
    // console.log("working here******")
    let obj = {
      domain: { id: selectedDomain.id, name: selectedDomain.name },
      skills: selectedskills,
      // .map(each=>{return {id: each.id, name: each.name, domainMasterId: each.domainMasterId}})
    };
    console.log("useeffect working******", selectedskills);
    // console.log("******",obj,index)
    updateFn(obj, index);

    console.log("&&&&&&&&&&&&&&&&&&&&&&", allSelectedDomains);
  }, [selectedDomain, selectedskills]);

  // const filterSkillset = () => {
  //   if(selectedDomain) {
  //     const newskillarray = skillSet.filter((val: any) => {
  //       return val.domainMasterId === selectedDomain.id
  //     })
  //     return newskillarray
  //   } else {
  //     return []
  //   }
  // }

  const handleChange = (event: any, value?: any, reason?: any) => {
    //console.log("name==>",event.target.id,event.target.id.includes("domain-field"))
    let obj = {};

    console.log("values outside", value, reason);
    if (reason === "clear") {
      setselectedDomain({ id: -1, name: "" });
    } else if (event.target.id.includes("domain-field")) {
      console.log("values", event, value);
      setselectedDomain(value);

      // obj = {
      //   domain: {id: value.id, name: value.name},
      //   skills: selectedskills.map(each=>{return {id: each.id, name: each.name, domainMasterId: each.domainMasterId}})
      // }
    } else {
      // obj = {
      //   domain: {id: selectedDomain.id, name: selectedDomain.name},
      //   skills: value.map(each=>{return {id: each.id, name: each.name, domainMasterId: each.domainMasterId}})
      // }
      seterrorValues({
        ...errorValues,
        skillsError: "",
      });

      setskillName(event.target.value);
      if (event?.target?.value?.length > 0) {
        console.log("inside iffff", event.target.value);
        axiosRequest
          .get(
            "skill/search/" +
              selectedDomain.id +
              "?search=" +
              event.target.value,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response: any) => {
            if (response.data.data) {
              console.log("pass", response.data.data);
              seterrorValues({
                ...errorValues,
                skillsError: "Skill exists",
              });
            } else {
              console.log("fail", response.message);
              seterrorValues({
                ...errorValues,
                skillsError: "",
              });
            }
            // skillSet.push(...response.data.data);
          });
      }
      // axiosRequest('')
      // autocomplete setskills
      // setselectedskills(value)
    }

    // console.log("object: ",obj)
    // updateFn(obj,index)
  };

  // const handleAdd = () => {
  //   const newList = selectedskills.concat({ name })
  // }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      console.log("do validate", event.target.value);
      if (errorValues.skillsError == "") {
        const newList = selectedskills.concat(event.target.value);
        setselectedskills(newList);
        setskillName("");
      }
    }
  };

  const handleDelete = (chipToDelete: any) => () => {
    // setselectedskills((chips) =>
    //   chips.filter((chip) => chip !== chipToDelete)
    // );

    const arr1 = [...selectedskills];
    console.log(
      "handle delete",
      chipToDelete,
      arr1,
      selectedskills.indexOf(chipToDelete)
    );
    arr1.splice(selectedskills.indexOf(chipToDelete), 1);
    console.log("after slice", arr1);

    setselectedskills(arr1);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: "15px",
      }}
    >
      <Autocomplete
        id="domain-field"
        options={domainSet}
        size="small"
        onChange={(e, v, reason) => {
          handleChange(e, v, reason);
        }}
        sx={{ width: 400, marginRight: "25px" }}
        getOptionDisabled={(option: any) => {
          // console.log(option);
          const valDomains = allSelectedDomains.map((val) => val.domain.name);
          // console.log('disabled option',valDomains, valDomains.indexOf(option.name) !== -1, option.name)
          return valDomains.indexOf(option.name) !== -1;
          // return allSelectedDomains.map(val => val.domain).filter(value => value.id !== option.id);
        }}
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

      {/* <Autocomplete
      id="skills-field"
        disabled={selectedDomain === ''}
        sx={{ width: 400 }}
        multiple
        onChange={(e,v) => {handleChange(e, v)}}
        options={ filterSkillset()}
        getOptionLabel={(option: any) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Skills" placeholder="Skills" />
        )}
      /> */}

      {/* <div>
        <TextField
          id="outlined-basic"
          sx={{ width: 400 }}
          label="Skills"
          onChange={handleChange}
          variant="outlined"
          onKeyDown={handleKeyDown}
          value={skillName}
          error={errorValues.skillsError.length > 0 && skillName !== ""}
          helperText={skillName == "" ? "" : errorValues.skillsError}
        />

        <div>
          {selectedskills.length > 0 &&
            selectedskills.map((data) => {
              let icon;

              return (
                <ListItem>
                  <Chip
                    icon={icon}
                    label={data}
                    onDelete={handleDelete(data)}
                  />
                </ListItem>
              );
            })}
        </div>
      </div> */}

      <Autocomplete
        multiple
        key={`skills-${index}`}
        id={`skills-${index}`}
        options={[]}
        freeSolo
        size="small"
        sx={{ width: 400 }}
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
          if (event.key === "Enter") {
            event.defaultMuiPrevented = errorValues.skillsError.length > 0;
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
