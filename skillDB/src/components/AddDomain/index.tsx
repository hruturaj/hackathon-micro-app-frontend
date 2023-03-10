import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import axiosRequest from "../../services/http.service";
import { useSnackbar } from "notistack";
import AddDomainFields from "../AddDomainFields";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

// form to add domain and their corresponding skills
function AddDomain() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [userSelectedDomains, setUserSelectedDomains] = useState([]);
  const [alldomains, setAlldomains] = useState([]);
  const [currentSkills, setCurrentSkill] = useState([]);
  const [formsCount, setFormsCount] = useState(1);
  const [formErrors, setFormErrors] = useState({
    domainError: "",
    skillsError: "",
  });

  useEffect(() => {
    axiosRequest
      .get("domain", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res: any) => {
        setAlldomains(res.data.data);
      });
  }, []);

  useEffect(() => {}, [userSelectedDomains]);

  const updateValues = (obj: any, index: number) => {
    let v1 = userSelectedDomains;
    v1.splice(index, 1, obj);
    setUserSelectedDomains(v1);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    if (
      formErrors?.domainError?.trim()?.length > 0 ||
      formErrors?.domainError?.trim()?.length > 0 ||
      userSelectedDomains.length === 0
    ) {
      return;
    }
    let arr: any = [];
    userSelectedDomains.forEach((each) => {
      return each.skills.forEach((eachSkill) => {
        let value = {
          domainMasterId: each.domain.id,
          name: eachSkill,
        };
        arr.push(value);
      });
    });

    axiosRequest
      .post(
        "skill",
        { data: arr },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res: any) => {
        enqueueSnackbar("Data Added Successfully !", {
          autoHideDuration: 2000,
          key: "addSkillRecord",
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
        navigate("/skill/list");
      });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", display: "block" }}>
        Add Your Domain & Skills
      </h2>
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
                <AddDomainFields
                  index={i}
                  allSelectedDomains={userSelectedDomains}
                  updateFn={updateValues}
                  // skillSet={allskills}
                  setCurrentSkill={setCurrentSkill}
                  setFormErrors={setFormErrors}
                  domainSet={alldomains.map((domain: any) => {
                    let obj = {
                      id: domain.id,
                      name: domain.name,
                    };

                    return obj;
                  })}
                />
              ))}
          </div>
          <div
            style={{ display: "flex", columnGap: 20, justifyContent: "center" }}
          >
            <Button
              disabled={
                formsCount === alldomains.length ||
                userSelectedDomains[formsCount - 1] === undefined ||
                currentSkills?.length === 0
              }
              variant="contained"
              style={{ width: 120 }}
              onClick={() => setFormsCount(formsCount + 1)}
            >
              Add New
            </Button>
            <Button
              style={{ width: 120 }}
              type="submit"
              variant="contained"
              disabled={
                formErrors?.domainError?.trim()?.length > 0 ||
                formErrors?.skillsError?.trim()?.length > 0 ||
                userSelectedDomains.length === 0 ||
                currentSkills?.length === 0
              }
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDomain;
