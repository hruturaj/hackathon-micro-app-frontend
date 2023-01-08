import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import {
  getAllDomains,
  getAllSkills,
  submitSkillForDomain,
} from "../../services/skills-lib";
import CloseIcon from "@mui/icons-material/Close";
import AddSkills from "../AddSkills";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function AddSkillsParent() {
  const initialValues: any = {
    domainMasterId: null,
    skillId: null,
    skillLevel: "",
    YOE: 0,
  };
  const [formsCount, setformsCount] = useState(1);
  const [alldomains, setalldomains] = useState([]);
  const [allskills, setallskills] = useState([]);
  const [userSelectedValues, setuserSelectedValues] = useState([initialValues]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("====>", userSelectedValues);
  // }, [userSelectedValues]);

  useEffect(() => {
    getAllDomains().then((res: any) => {
      console.log("responseeee", res.data.data);
      setalldomains(res.data.data);
    });

    // getAllSkills().then((res: any) => {
    //   console.log(res.data.data);
    //   setallskills(res.data.data);
    // });
  }, []);

  const submitHandler = (event: any) => {
    event.preventDefault();
    console.log("submitted", userSelectedValues);
    // API CALL TO SUBMIT USER SKILLS FOR A DOMAIN
    // USERID NEED TO BE ADDED CORRECTLY
    const finalUserSelectedValues = userSelectedValues.map(
      (eachSelectedVal) => {
        return {
          ...eachSelectedVal,
          userId: Number(localStorage.getItem("user")),
        };
      }
    );
    submitSkillForDomain(finalUserSelectedValues).then((res: any) => {
      enqueueSnackbar("Record Deleted Successfully !", {
        autoHideDuration: 2000,
        key: "deleteRecord",
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
      navigate("/skill/choose");
    });
  };

  const updateValues = (obj, index, isDelete = false) => {
    let v1 = [...userSelectedValues];

    console.log("inside update", obj, index);
    v1[index] = obj;
    setuserSelectedValues(v1);
    if (isDelete) {
      console.log("after delete", userSelectedValues, index, obj);
      console.log("handle delete", index, userSelectedValues.indexOf(index));
      const arr1 = [...userSelectedValues];
      arr1.splice(index, 1);
      console.log("after slice", arr1);

      setuserSelectedValues(arr1);
      setformsCount(formsCount - 1);
    }
  };

  const disableAdd = () => {
    console.log(
      "disable check",
      userSelectedValues[formsCount - 1].domainMasterId &&
        userSelectedValues[formsCount - 1].skillId &&
        userSelectedValues[formsCount - 1].skillLevel &&
        userSelectedValues[formsCount - 1].YOE
    );
    if (
      userSelectedValues[formsCount - 1].domainMasterId &&
      userSelectedValues[formsCount - 1].skillId &&
      userSelectedValues[formsCount - 1].skillLevel &&
      userSelectedValues[formsCount - 1].YOE
    ) {
      return false;
    }
    return true;
    // Object.keys(userSelectedValues[formsCount -1]).map(each => {

    // })
  };

  const disableSubmit = () => {
    let submitEnable = false;
    userSelectedValues.every((eachUserSelectedVal) => {
      if (
        !(
          eachUserSelectedVal.domainMasterId &&
          eachUserSelectedVal.skillId &&
          eachUserSelectedVal.skillLevel &&
          eachUserSelectedVal.YOE
        )
      ) {
        submitEnable = true;
        return false;
      }
      return true;
    });
    return submitEnable;
  };

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
                      domainMasterId: eachSkill.domainMasterId,
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
          <Button
            variant="contained"
            disabled={disableAdd()}
            style={{ marginRight: "15px" }}
            onClick={() => {
              setformsCount(formsCount + 1);
              userSelectedValues.push(initialValues);
            }}
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
