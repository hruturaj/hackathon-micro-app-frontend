import axios from "axios";

export const checkUserLoggedIn = () => {
    const userToken = localStorage.getItem("token");
    console.log("token", userToken);
    if (
      userToken !== null &&
      userToken !== undefined &&
      String(userToken).trim() !== ""
    ) {
        return true
    } else {
        return false
    } 
}

export const dataRequest = (requestUrl = "", options = {}) => {
    const serverDomain = "http://localhost:3000";
    return axios({
      url: `${serverDomain}${requestUrl}`,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJwYWtoaXJhNTVAZ21haWwuY29tIiwibmFtZSI6IlNvdXJhdiBQYWtoaXJhIiwiaWF0IjoxNjcyNDExMjk3fQ.XBwPDTPN4UoWp5ZHoRlnArVd6ugwZmkVcqYY1AVKYuk",
      },
      ...options,
    });
  };