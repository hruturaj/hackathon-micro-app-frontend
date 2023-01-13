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

  useEffect(() => {
    getAllDomains().then((res: any) => {
      setalldomains(res.data.data);
    });
  }, []);

  const submitHandler = (event: any) => {
    event.preventDefault();
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

    v1[index] = obj;
    setuserSelectedValues(v1);
    if (isDelete) {
      const arr1 = [...userSelectedValues];
      arr1.splice(index, 1);

      setuserSelectedValues(arr1);
      setformsCount(formsCount - 1);
    }
  };

  const disableAdd = () => {
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
      <h2 style={{ textAlign: "center", display: "block" }}>
        Choose Your Skills
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 50,
        }}
      >
        <form style={{ textAlign: "center" }} onSubmit={submitHandler}>
          <div style={{ paddingBottom: "30px" }}>
            {alldomains &&
              // allskills &&
              [...Array(formsCount)].map((e, i) => (
                <AddSkills
                  key={i}
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              columnGap: "20px",
            }}
          >
            <Button
              sx={{
                width: 120,
              }}
              variant="contained"
              disabled={disableAdd()}
              onClick={() => {
                setformsCount(formsCount + 1);
                userSelectedValues.push(initialValues);
              }}
            >
              ADD New
            </Button>
            <Button
              sx={{
                width: 120,
              }}
              disabled={disableSubmit()}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSkillsParent;
