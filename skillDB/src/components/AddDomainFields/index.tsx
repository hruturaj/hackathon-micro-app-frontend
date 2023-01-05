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

      console.log(event.target.value);
      setskillName(event.target.value);
      if (event.target.value.length > 0) {
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
      {console.log("heloooooooooo", selectedDomain)}
      <Autocomplete
        id="domain-field"
        options={domainSet}
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

      <div>
        {console.log("^^^^^", errorValues.skillsError.length > 0, errorValues)}
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
          {console.log("selected skills", selectedskills)}
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
      </div>
    </div>
  );
}

export default AddDomainFields;
