import React from "react";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
export default function SignOut(props) {
  useEffect(() => {
    localStorage.removeItem("token");
    props.parentProps.setStudent({});
    Swal.fire({
      position: "center",
      icon: "success",
      title: " Sign-Out successful :)",
      showConfirmButton: true,
      timer: 2000
    });
  });
  return <Redirect to={"/studentSignIn"} />;
}
