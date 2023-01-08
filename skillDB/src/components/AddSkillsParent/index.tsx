import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import axiosRequest from "../../services/http.service";
import { getAllDomains, getAllSkills, submitSkillForDomain } from "../../services/skills-lib";

import AddSkills from "../AddSkills";

function AddSkillsParent() {
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
  const [formsCount, setformsCount] = useState(1);
  const [alldomains, setalldomains] = useState([]);
  const [allskills, setallskills] = useState([]);
  const [userSelectedValues, setuserSelectedValues] = useState([
    initialValues
  ]);

  // useEffect(() => {
  //   console.log("====>", userSelectedValues);
  // }, [userSelectedValues]);

  useEffect(() => {
    getAllDomains().then((res: any) => {
      console.log('responseeee',res.data.data);
      setalldomains(res.data.data);
    });

    getAllSkills().then((res: any) => {
      console.log(res.data.data);
      setallskills(res.data.data);
    });
  }, []);

  const submitHandler = (event: any) => {
    event.preventDefault();
    console.log('submitted',userSelectedValues);
    // API CALL TO SUBMIT USER SKILLS FOR A DOMAIN
  // USERID NEED TO BE ADDED CORRECTLY
    // const finalUserSelectedValues = userSelectedValues.map(eachSelectedVal => {
    //   return {
    //     skillLevel: eachSelectedVal.level,
    //     YOE: eachSelectedVal.experience,
    //     userId: 1,
    //     domainMasterId: eachSelectedVal.domain.id,
    //     skillId: eachSelectedVal.skills.id
    //   }
    // })
    // submitSkillForDomain(finalUserSelectedValues).then((res: any) => {
      
    // })

  };

  const updateValues = (obj, index, isDelete=false) => {
    let v1 = [...userSelectedValues];

    console.log("inside update", obj, index);
    v1[index] = obj;
    setuserSelectedValues(v1);
    if(isDelete) {
      console.log("after delete", userSelectedValues, index, obj);
      console.log(
          "handle delete",
          index,
          userSelectedValues.indexOf(index)
        );


        const arr1 = [...userSelectedValues];
        arr1.splice(index, 1);
        console.log("after slice", arr1);

        setuserSelectedValues(arr1);
        setformsCount(formsCount - 1);
    }
  };

  const disableAdd = () => {
    console.log('disable check',userSelectedValues[formsCount -1].domain.name && userSelectedValues[formsCount -1].skills.name && userSelectedValues[formsCount -1].level && userSelectedValues[formsCount -1].experience)
    if(userSelectedValues[formsCount -1].domain.name && userSelectedValues[formsCount -1].skills.name && userSelectedValues[formsCount -1].level && userSelectedValues[formsCount -1].experience){
        return false;
    }
    return true;
    // Object.keys(userSelectedValues[formsCount -1]).map(each => {
              
    // })
  }

  const disableSubmit = () => {
    let submitEnable = false;
    userSelectedValues.every(eachUserSelectedVal => {
      if(!(eachUserSelectedVal.domain.name && eachUserSelectedVal.skills.name && eachUserSelectedVal.level && eachUserSelectedVal.experience)){
          submitEnable = true;
          return false;
      }
      return true;
    })
    return submitEnable;
  }



  return (
    <div>
      <h2 style={{ textAlign: "center", display: "block" }}>Problem St2</h2>
      <div
        style={{
          justifyContent: "center",
          padding: "50px 0 100px 0",
        }}
      >
        <form style={{ textAlign: "center" }} onSubmit={submitHandler}>
          <div style={{ paddingBottom: "15px" }}>
            {alldomains &&
              // allskills &&
              [...Array(formsCount)].map((e, i) => (
                <AddSkills
                  index={i}
                  userSelectedValues={userSelectedValues}
                  updateFn={updateValues}
                  skillSet={allskills.map((eachSkill: any) => {
                    let obj = {
                      id: eachSkill.id,
                      name: eachSkill.name,
                      domainMasterId: eachSkill.domainMasterId
                    };

                    return obj;
                  })}
                  domainSet={alldomains.map((eachDomain: any) => {
                    let obj = {
                      id: eachDomain.id,
                      name: eachDomain.name,
                    };

                    return obj;
                  })}
                />
              ))}
          </div>
          {console.log('Rendernggggggggggg')}
          <Button
            variant="contained"
            disabled={disableAdd()}
            style={{ marginRight: "15px" }}
            onClick={() => { setformsCount(formsCount + 1); userSelectedValues.push(initialValues)}}
          >
            ADD
          </Button>
          <Button disabled={disableSubmit()} type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddSkillsParent;
