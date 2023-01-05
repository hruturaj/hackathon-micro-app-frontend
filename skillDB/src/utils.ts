import axios from "axios";

export const checkUserLoggedIn = () => {
    const userToken = localStorage.getItem("token");
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