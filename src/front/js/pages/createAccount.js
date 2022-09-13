import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const CreateAccount = () => {
  const [data, setData] = useState({});
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const redirect = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    //VALIDACIÓN DE FORMULARIO
    e.preventDefault();
    setMensaje("");

    if (
      data["email"] === undefined ||
      data["email"] === "" ||
      data["password"] === undefined ||
      data["password"] === ""
    ) {
      console.log(data["email"]);
      console.log(data["password"]);
      console.log("todos los campos son obligatorios");
      setMensaje(
        <p className="mensaje mensaje-error">
          Todos los campos son obligatorios
        </p>
      );
    }

    if (data["email"]) {
      //expresión regular para comprobar que es un email
      const er =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (er.test(data["email"])) {
        //para comprobar si el email existe en la base de datos
        fetch(
          "https://3001-4geeksacade-reactflaskh-30yqu5yx68t.ws-eu64.gitpod.io/api/getuser",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((resp) => {
            return resp.json();
          })
          .then((resp) => {
            const listaEmail = resp.map((user) => {
              return user.email;
            });
            if (listaEmail.includes(data["email"])) {
              setMensaje(
                <p className="mensaje mensaje-error">
                  Ya hay una cuenta con este email.
                </p>
              );
            } else {
              //Si es un email válido, conecta con la base de datos
              console.log(data);
              fetch(
                "https://3001-4geeksacade-reactflaskh-30yqu5yx68t.ws-eu64.gitpod.io/api/user",
                {
                  method: "POST",
                  body: JSON.stringify(data),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              ).then((resp) => {
                console.log(resp);
              });
              console.log(data);

              setMensaje(
                <p className="mensaje mensaje-exito">
                  Cuenta creada correctamente.
                </p>
              );
              setTimeout(redirect, 1500);
            }
          });
      } else {
        setMensaje(
          <p className="mensaje mensaje-error">Introduce un email válido</p>
        );
      }
    }
  };

  return (
    <>
      <h1>Crea una cuenta nueva</h1>
      <form>
        <label>Email</label>

        <input
          type="email"
          placeholder="Escribe tu email"
          name="email"
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Escribe tu contraseña"
          name="password"
          onChange={handleChange}
        />
        <input
          className="submit"
          type="submit"
          value="Iniciar Sesión"
          onClick={(e) => {
            handleSubmit(e);
          }}
        />
        
          {mensaje}
        
      </form>
    </>
  );
};
