import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";


export const Private = () => {
  const navigate = useNavigate();
  const token = localStorage.token;


  const exit = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      fetch(`https://3001-4geeksacade-reactflaskh-30yqu5yx68t.ws-eu64.gitpod.io/api/validatoken`, {
        headers: {
          method: "GET",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.status == 200) {
          // return res.json();
          SetLoading(false);
        } else {
          SetLoading(false);
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className= "private">
      <h1>Puedes ver esta página porque has iniciado sesión</h1>
      <button onClick={exit}>Cerrar Sesión</button>
    </div>
  );
};
