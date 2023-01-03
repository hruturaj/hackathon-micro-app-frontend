import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

import { getAllDomains, getAllSkills } from "../../services/skills-lib";
import AddDomainFields from "../AddDomainFields";

// form to add domain and their corresponding skills
function AddDomain() {
  const initialValues: {
    domain: { id: number; name: string };
    skills: { id: number; name: string; domainMasterId: number }[];
  } = {
    domain: { id: -1, name: "" },
    skills: [{ id: -1, name: "", domainMasterId: -1 }],
  };

  const [userSelectedDomains, setuserSelectedDomains] = useState([
    initialValues,
  ]);
  const [alldomains, setalldomains] = useState([]);
  const [allskills, setallskills] = useState(null);
  const [formsCount, setformsCount] = useState(1);

  useEffect(() => {
    getAllDomains().then((data: any) => {setalldomains(data.data); });
    getAllSkills().then((data: any) => setallskills(data.data));
  }, []);

  useEffect(() => {
    console.log("====>", userSelectedDomains);
  }, [userSelectedDomains]);

  const updateValues = (obj, index) => {
    let v1 = userSelectedDomains;

    v1[index] = obj;
    setuserSelectedDomains(v1);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    console.log(userSelectedDomains)
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", display: "block" }}>Problem St1</h2>
      <div
        style={{
          justifyContent: "center",
          padding: "50px 0 100px 0",
        }}
      >
        {console.log("====>", userSelectedDomains)}

        <form style={{ textAlign: "center" }} onSubmit={submitHandler}>
          <div style={{ paddingBottom: "15px" }}>
            {alldomains &&
              allskills &&
              [...Array(formsCount)].map((e, i) => (
                <AddDomainFields
                  index={i}
                  allSelectedDomains={userSelectedDomains}
                  updateFn={updateValues}
                  skillSet={allskills}
                  domainSet={alldomains.map((domain: any) => {
                    let obj = {
                      id: domain.id,
                      name: domain.name
                    }

                    return obj;
                  })}
                />
              ))}
          </div>
          <Button
            disabled={formsCount === alldomains.length}
            variant="contained"
            style={{marginRight: '15px'}}
            onClick={() => setformsCount(formsCount + 1)}
          >
            ADD
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddDomain;
