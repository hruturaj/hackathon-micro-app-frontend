import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

function AddDomainFields({index, updateFn, skillSet, domainSet, allSelectedDomains}) {
//   const domainSet = [];
//   const skillSet = []
// const results = domainSet.filter(({ value: id1 }) => !allSelectedDomains.some(({ value: id2 }) => id2 === id1));
// console.log('difference---------------------',results)

const [selectedDomain, setselectedDomain] = useState<any>()
const [selectedskills, setselectedskills] = useState<any>([])

useEffect(() => {

  // console.log("working******")

  if(selectedDomain==null){
    return
  }
  // console.log("working here******")
  let obj = {
    domain: {id: selectedDomain.id, name: selectedDomain.name},
    skills: selectedskills.map(each=>{return {id: each.id, name: each.name, domainMasterId: each.domainMasterId}})
  }
  console.log("******",obj,index)
  updateFn(obj,index)

  console.log('&&&&&&&&&&&&&&&&&&&&&&',allSelectedDomains);

  // A comparer used to determine if two entries are equal.
// const isSameUser = (a, b) => a.id === b.id && a.name === b.name;

// Get items that only occur in the left array,
// using the compareFunction to determine equality.
// const onlyInLeft = (left, right, compareFunction) => 
//   left.filter(leftValue =>
//     !right.some(rightValue => 
//       compareFunction(leftValue, rightValue)));

// const onlyInA = onlyInLeft(domainSet, allSelectedDomains.map(all => all.domain), isSameUser);
// const onlyInB = onlyInLeft(allSelectedDomains.map(all => all.domain), domainSet, isSameUser);

// const result = [...onlyInA, ...onlyInB];
//   let difference = domainSet.filter(x => (
//     !allSelectedDomains.includes(x.name))
//     );

}, [selectedDomain,selectedskills])


const filterSkillset = () => {
  if(selectedDomain) {
    const newskillarray = skillSet.filter((val: any) => {
      return val.domainMasterId === selectedDomain.id
    })
    return newskillarray
  } else {
    return []
  }
}


const handleChange = (event: any, value?: any) => {
  //console.log("name==>",event.target.id,event.target.id.includes("domain-field"))
  let obj = {}
  if(event.target.id.includes("domain-field")){
    console.log("values",value)
    setselectedDomain(value)

    // obj = {
    //   domain: {id: value.id, name: value.name},
    //   skills: selectedskills.map(each=>{return {id: each.id, name: each.name, domainMasterId: each.domainMasterId}})
    // }
    

  }else{
    // obj = {
    //   domain: {id: selectedDomain.id, name: selectedDomain.name},
    //   skills: value.map(each=>{return {id: each.id, name: each.name, domainMasterId: each.domainMasterId}})
    // }
    console.log(event.target.value)
    // axiosRequest('')
    // autocomplete setskills
    setselectedskills(value)
  }

  // console.log("object: ",obj)
  // updateFn(obj,index)
 
}

const handleKeyDown = (event: any) => {
  if (event.key === 'Enter') {
    console.log('do validate', event.target.value)
    // setselectedskills(event.target.value)
  }
}

const handleDelete = (chipToDelete: any) => () => {
  setselectedskills((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
};

  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly', paddingBottom: '15px'}}>
      {console.log("domain",selectedDomain)}
      {console.log("skillset",selectedskills)}
      <Autocomplete
        id="domain-field"
        options={domainSet}
        onChange={(e,v) => {handleChange(e, v)}}
        sx={{ width: 400 }}
        disableClearable
        getOptionLabel={(option: any) => option.name}
        renderInput={(params) => <TextField {...params} label="Domain" />}
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

      <TextField id="outlined-basic" sx={{ width: 400 }} label="Skills" onChange={handleChange} variant="outlined" onKeyDown={handleKeyDown} />
      {selectedskills.length > 0 && selectedskills.map((data) => {
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
  );
}

export default AddDomainFields;
