import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
export default function NoMatch(props) {

  // this useEffect remove the token to useId.
  useEffect(() => {
    localStorage.removeItem("token");
    Swal.fire({
      position: "center",
      icon: "error",
      title: "404 Not Found :( ",
      showConfirmButton: true,
      timer: 2000
    });
  });

  return <Redirect exact to="/signOut" />;
}
