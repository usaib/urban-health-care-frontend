import React, { createContext, useState } from "react";

const AuthContext = createContext({
	token: "",
	isLoggedIn: false,
	userEmail: "",
	role: "",
	login: (token) => {},
	logout: () => {}
});
export function AuthContextProvider(props) {
	const [token, setToken] = useState(null);
	const userIsLoggedIn = !!parseInt(localStorage.getItem("isLoggedIn", 0));
	const email = localStorage.getItem("email");
	const role = localStorage.getItem("role");
	const tot = localStorage.getItem("tot");
	const [isLoggedIn, setIsLoggedIn] = useState(userIsLoggedIn);
	const [userEmail, setUserEmail] = useState(email);
	const [userRole, setUserRole] = useState(role);

	const loginHandler = (token, user) => {
		
		localStorage.setItem("token", token);
		setIsLoggedIn(1);
		localStorage.setItem("isLoggedIn", 1);
		localStorage.setItem("email", user.email);
		localStorage.setItem("role", user.role);

		if (user.vendors[0]) {
			localStorage.setItem("vendor", user.vendors[0]["name"]);
			localStorage.setItem("tot", user.vendors[0]["tot"]);
		}
		setUserRole(user.role);
		setToken(token);
		setUserEmail(user.email);
	};
	const logoutHandler = () => {
		setToken(null);
		setIsLoggedIn(0);
		setUserEmail("");
		setUserRole("");
		
		localStorage.setItem("token", null);
		localStorage.setItem("isLoggedIn", 0);
		localStorage.removeItem("email");
		localStorage.removeItem("role");
		localStorage.removeItem("vendor");
		localStorage.removeItem("tot");
	};
	
	const contextValue = {
		token: token,
		isLoggedIn: isLoggedIn,
		userEmail: userEmail,
		role: userRole,
		login: loginHandler,
		logout: logoutHandler
	};
	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
