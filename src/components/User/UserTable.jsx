import { useState } from "react";
import { Helmet } from "react-helmet";
import { Box, Container, makeStyles } from "@material-ui/core";
import Table from "../table/Table";
import getAllUsers from "../../services/users";
import { remove } from "../../services/users";
import Toolbar from "../User/UserToolbar";
import UserForm from "./UserForm";
import { getDispenseInRecords, getInventory } from "../../services/inventory";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(2)
	}
}));

const headers = [
	{
		label: "ID",
		value: "id",
		type: "numeric",
		filterKey: "id",
		filterType: "text"
	},
	{ label: "Name", value: "name", filterKey: "name", filterType: "select" },
	{ label: "Type", value: "type" },
	{ label: "Quantity", value: "quantity" },
	{ label: "Quantity Updated", value: "quantityUpdated" },
	{ label: "Created At", value: "createdAt", type: "date" }
];
function Users() {
	const classes = useStyles();
	const [formUser, setFormUser] = useState();
	const [isUserFormVisible, setUserFormVisible] = useState(false);

	const fetchUsers = async (params) => {
		const token = localStorage.getItem("token", 0);
		params.token = token;
		console.log("params", params);
		const resp = await getDispenseInRecords(params);

		const users = resp.data.data.data.rows;
		const data = users.map((obj) => {
			let flat = {
				...obj,
				...obj.inventory
			};
			return flat;
		});
		console.log(data);
		return {
			total: resp.data.data.data.count,
			data: data,
			count: resp.data.data.data.count
		};
	};
	const getNames = async (params) => {
		const resp = await getInventory(params);
		const inventory = resp.data.data.data.rows;
		const transfromedData = inventory.map((data) => {
			return data.name;
		});
		console.log("td", transfromedData);

		return {
			data: transfromedData
		};
	};
	const tableProps = {
		headers,
		getData: fetchUsers,
		getNames,
		onEdit: (userObj) => {
			setFormUser(userObj);
			setUserFormVisible(true);
		},
		onDelete: remove,
		dateFilters: false,
		omsOptions: []
	};

	return (
		<div>
			<Helmet>
				<title>Users | Baggallery</title>
			</Helmet>

			<Box className={classes.root}>
				<Container maxWidth={false}>
					<Table {...tableProps} />
				</Container>
			</Box>
		</div>
	);
}

export default Users;
