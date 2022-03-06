import axios from "axios";
import "dotenv/config";
require("dotenv").config();
const url = "http://18.119.70.158:5001";
const getAllUsers = async (params) => {
	return axios.post(
		`${url}/user/getAllUsers`,
		{ limit: params.limit, offset: params.offset },
		{
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token", 0)
			}
		}
	);
};
export const getInventory = async (params) => {
	return axios.post(
		`http://localhost:5001/inventory/getInventory`,
		{ limit: params.limit, offset: params.offset },
		{
			headers: {
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MSwiZW1haWwiOiJ1c2FpYmtoYW5AZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMi0wMy0wNlQxNDo0MToyNi44NTlaIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY0NjU3NzY4Nn0._13xW9X2tTPM1bT9T3C32vCxNeP4K3GOJJummhWBYaM"
			}
		}
	);
};
const checkRole = (roleValue) => {
	if (roleValue == 1) {
		return "vendor";
	}
	if (roleValue == 2) {
		return "admin";
	}
	if (roleValue == 3) {
		return "finance";
	}
	if (roleValue == 4) {
		return "purchase";
	}
	if (roleValue == 5) {
		return "warehouse";
	} else return 0;
};
export const createUser = async (params) => {
	return axios.post(
		`${url}/user/createUser`,
		{
			name: params.name,
			email: params.email,
			password: params.password,
			role: checkRole(params.role),
			vendor: params.vendor,
			createAt: new Date(),
			updatedAt: new Date()
		},
		{
			headers: {
				Authorization: "Bearer " + params.token
			}
		}
	);
};

export const getAllVendors = async (params) => {
	return axios.post(
		`${url}/vendor/getAllVendors`,
		{ limit: params.limit, offset: params.offset },

		{
			headers: {
				Authorization: "Bearer " + params.token
			}
		}
	);
};
export const updateUser = async (params) => {
	return axios.post(
		`${url}/user/updateUser`,
		{
			...params,
			role: checkRole(params.role)
		},
		{
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token", 0)
			}
		}
	);
};

export const remove = async (params) => {
	return axios.post(
		`${url}/user/deleteUser`,
		{ id: params.id },
		{
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token", 0)
			}
		}
	);
};

export default getAllUsers;
