import axiosRequest, { axiosRequestApp1 } from "./http.service";

export const getAllDomains = async () => {
  const response: any = axiosRequestApp1
    .get("domain", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then();
  return response;
};

export const getAllSkills = async (domainId: number) => {
  const response: any = axiosRequest.get(`skill/${domainId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return response;
};

export const submitSkillForDomain = async (data: any) => {
  const response: any = axiosRequest.post(
    "user-skill",
    { data: data },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );

  return response;
};
