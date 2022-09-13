import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Form } from "../component/form";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 contenedor">
			<h1>Inicio de sesión con autenticación.</h1>
			{/* <p>
				<img src={rigoImageUrl} />
			</p> */}
			<Form />

		</div>
	);
};
