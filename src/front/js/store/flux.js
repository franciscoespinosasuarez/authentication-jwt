const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
		},
		actions: {
			login: async (email, password) => {
				const opts = {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
				  },
				  body: JSON.stringify({
					email: email,
					password: password,
				  }),
				};
		
				try {
				  const resp = await fetch("https://3001-4geeksacade-reactflaskh-30yqu5yx68t.ws-eu64.gitpod.io/api/login", opts);
		
				  if (![200, 401].includes(resp.status)) {
					return null;
				  }
		
				  const data = await resp.json();
				  console.log({ data });
		
				  if (resp.status == 200) {
					localStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });

				  }
		
				  return data;
				} catch (error) {
				  console.log(error);
				}
			  },
		}
	};
};

export default getState;
