import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const Form =()=>{
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");


  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setMensaje("");

    if (email === "" || password === "") {
      setMensaje("Todos los campos son obligatorios");
      return console.log("todos los campos son obligatorios");
    }

    if (email !== "") {
      const er =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (er.test(email)) {
        actions.login(email, password).then((data) => {
          if (data.message) {
            setMensaje(data.message);
            return;
          }

          const token = localStorage.getItem("token");
          //BUSCAR LA FORMA DE QUE HAGA EL REDIRECT CUANDO SE PRESIONA EL BOTÓN LOGIN

          console.log(token);
          if (token) {
            console.log("funciona");
            navigate("/private");
          } else {
            console.log("no funciona");
            setMensaje("Contraseña incorrecta");
          }
        });
      } else {
        setMensaje("Introduce un email válido");
      }
    }
  };

    return (
        <>
        <form>
            <label>Email</label>

            <input 
                type= "email"
                placeholder="Escribe tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
                type= "password"
                placeholder="Escribe tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="submit" 
                type= "submit" 
                value="Iniciar Sesión"
                onClick={handleClick}/>
            <p hidden={!mensaje} className="mensaje mensaje-error">
            {mensaje}
          </p>

        </form>

        <p>Haz click <Link to="/create-account">aquí</Link>  para crear una cuenta</p>
        
        </>
    )
}