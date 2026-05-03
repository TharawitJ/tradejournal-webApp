// commons/utils/authCheck.ts
import { jwtDecode } from "jwt-decode";
import useUserStore from "../../stores/userStore";

const checkTokenExpiration = () => {
  const userData = localStorage.getItem("userState");
  console.log(userData)
  if (!userData) return;

  try {
    // {state:{token}} --> destruct object
    const { state:{token} } = JSON.parse(userData);
    // console.log(token)
    const decoded: any = jwtDecode(token);

    // Date.now() is in milliseconds, decoded.exp is in seconds
    const isExpired = decoded.exp < Date.now() / 1000;

    if (isExpired) {
      console.log("Token expired! Logging out...");
      
      // 1. Clear Storage
      localStorage.removeItem("userState");
      
      // 2. Clear Zustand State (using the non-hook version)
      useUserStore.getState().logout();
      
      // 3. Force Redirect (since we are outside a component)
      window.location.href = "/";
    }
  } catch (error) {
    console.error("Invalid token", error);
    // localStorage.removeItem("userState");
    // window.location.href = "/";
  }
};

export default checkTokenExpiration;