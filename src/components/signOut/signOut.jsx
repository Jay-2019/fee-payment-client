import React from "react";
import { Redirect } from "react-router-dom";
export default function SignOut() {
  localStorage.removeItem("token");
  return <Redirect to={"/studentSignIn"} />;
}
