import axios from "axios";
import "dotenv/config";
require("dotenv").config();
const url = "http://localhost:5001";
const SignIn = async (params) => {
	return axios.post(`${url}/auth/signIn`, {
		email: params.email,
		password: params.password
	});
};

export const SignOut = async (params) => {
	return axios.post(`${url}/auth/signOut`, {
		email: params.email
	});
};
export default SignIn;
