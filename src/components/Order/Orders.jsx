import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Box, Container, makeStyles, Chip } from "@material-ui/core";
import Table from "../table/Table";
import getOrders from "../../services/orders";
import { getInventory, remove } from "../../services/inventory";

import { fetchOptions } from "../../services/orders";
import AuthContext from "../../context/AuthContext";
import moment from "moment";
import MedicineForm from "./MedicineForm";
import Toolbar from "./MedicineToolbar";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: "100%",
		paddingBottom: theme.spacing(2),
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
	{ label: "Company", value: "company" },
	{ label: "Distributor", value: "distributor" },
	{ label: "Consumed", value: "consumed" },
	{ label: "Balance", value: "balanced" },
	{ label: "Expiry Date", value: "expiryDate", type: "date" },
	{ label: "Created At", value: "createdAt", type: "date" }
];
let vendorHeaders = headers.filter((e) => {
	return (
		e.value != "vendor" && e.value != "brand" && e.value != "shipmentStatus"
	);
});

const daysLeft = (vendor, orderDate) => {
	let tot = localStorage.getItem(`${vendor}` + "tot");
	let arrivalDate = moment(orderDate).add(tot, "days");
	let daysLeft = arrivalDate.diff(new Date(), "days");

	if (daysLeft >= 0) {
		return [daysLeft, 1];
	} else {
		return [daysLeft, 0];
	}
};

const checkStatusIsDelayed = (status) => {
	if (status == "Delayed") {
		return true;
	} else {
		return false;
	}
};
const checkStatusToShowDaysLeft = (status) => {
	if (status == "Delayed" || status == "Pending") {
		return true;
	} else {
		return false;
	}
};
function Orders() {
	const classes = useStyles();
	const authContext = useContext(AuthContext);
	const tot = localStorage.getItem("tot");
	const [medicineForm, setMedicineForm] = useState();
	const [isMedicineFormVisible, setMedicineFormVisible] = useState(false);
	const [orderId, setOrderId] = useState("");

	const fetchInventory = async (params) => {
		const resp = await getInventory(params);
		const inventory = resp.data.data.data.rows;
		let selectOptions = [];
		inventory.forEach((obj) => {
			selectOptions.push(obj.id.toString());
		});
		const transfromedData = inventory.map((data) => {
			let obj = {
				...data,
				balanced: data.quantity - data.consumed
			};
			return obj;
		});
		console.log(resp);

		return {
			data: transfromedData,
			options: selectOptions,
			total: resp.data.data.data.count,
			count: resp.data.data.data.count
		};
	};

	const fetchOrdersCount = async (params) => {};

	const getHeaders = (role) => {
		if (role == "vendor") {
			return vendorHeaders;
		} else {
			return headers;
		}
	};
	const getOmsOptions = (role) => {
		return ["Dispense In", "Dispense Out"];
	};
	const getOmsOptionsColours = (role) => {
		return [{ key: "Dispense Out", value: "pending", color: "#0381d1" }];
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
		headers: getHeaders(authContext.role),
		getData: fetchInventory,
		getNames,
		dateFilters: true,
		omsOptions: getOmsOptions(authContext.role),
		omsOptionsWithColours: getOmsOptionsColours(authContext.role),
		getOrdersCount: fetchOrdersCount,
		onDetails: (details) => {
			setMedicineForm(true);
		},
		onEdit: (medicineObj) => {
			setMedicineForm(medicineObj);
			setMedicineFormVisible(true);
		},
		onDelete: remove
	};

	return (
		<div>
			<Helmet>
				<title>Urban Health Care | Dashboard</title>
			</Helmet>
			{isMedicineFormVisible ? (
				<MedicineForm
					orderId={orderId}
					Medicine={medicineForm}
					medicineHandler={setMedicineForm}
					medicineFormHandler={setMedicineFormVisible}
				/>
			) : (
				<Box className={classes.root}>
					<Container maxWidth={false}>
						<Toolbar medicineFormHandler={setMedicineFormVisible} />
						<Table {...tableProps} />
					</Container>
				</Box>
			)}
		</div>
	);
}

export default Orders;
