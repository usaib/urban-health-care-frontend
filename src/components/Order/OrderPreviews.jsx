import React from "react";
import { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import {
	Box,
	Grid,
	Container,
	makeStyles,
	withStyles,
	Paper,
	IconButton,
	Divider
} from "@material-ui/core";
import { MdArrowBack as BackIcon } from "react-icons/md";
import {
	TextField,
	SingleSelect,
	Button,
	Toast,
	Typography
} from "@material-ui/core";
import getOrders, { getOrdersById } from "../../services/orders";
import { Loader } from "../core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
	formWrapper: {
		margin: theme.spacing(3),
		padding: theme.spacing(3)
	},
	table: {
		minWidth: 550
	},
	icon: {
		fontSize: 25,
		color: theme.palette.primary.main,
		cursor: "pointer",
		float: "right"
	},
	loaderPosition: {
		position: "absolute",
		right: "48%",
		top: "28%",
		zIndex: 1
	},
	loaderPositionEmpty: {
		position: "absolute",
		right: "48%",
		top: "28%",
		zIndex: 1
	},
	stats: {
		borderTop: "1px solid rgba(224, 224, 224, 1)",
		borderBottom: "1px solid rgba(224, 224, 224, 1)",
		marginTop: "2px"
	},
	statsTop: {
		paddingTop: "10px",
		borderBottom: "1px solid rgba(224, 224, 224, 1)",
		marginTop: "2px"
	}
}));
const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover
		}
	}
}))(TableRow);

const headers = [
	{
		label: "Order No.",
		value: "order_number",

		type: "numeric"
	},
	{ label: "Product Name", value: "productName" },
	{ label: "Sku", value: "sku", filterKey: "sku", filterType: "text" },

	{
		label: "Quantity",
		value: "product_uom_qty"
	},
	{ label: "Unit Price", value: "price_unit", type: "numeric" },
	{ label: "Cost", value: "cost", type: "numeric" },
	{
		label: "Discounted Price",
		value: "discount"
	},
	{
		label: "Discount Percentage (%)",
		value: "discountPercentage"
	},

	{
		label: "Brand",
		value: "brand",
		filterKey: "brand",
		filterType: "select"
	}
];

const OrderPreviews = ({
	vendor,
	startDate,
	endDate,
	setIds,
	preview,
	previewHandler
}) => {
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [vendorName, setVendorName] = useState("");
	const [vendorEmail, setVendorEmail] = useState("");
	const [vendorAddress, setVendorAddress] = useState("");

	useEffect(() => {
		const fetchOrders = async () => {
			const token = localStorage.getItem("token", 0);
			try {
				const resp = await getOrders({
					vendor: [vendor],
					filters: { omsStatus: ["Ready to pickup"] },
					limit: 10000,
					offset: 0,
					gte: startDate,
					lte: endDate,
					token
				});
				const orders = resp.data.data.data.hits.hits;
				const ordersData = orders.map((order) => {
					return order._source;
				});
				const transfromedData = ordersData.map((oms) => {
					let obj = {
						...oms,
						discount: (oms.price_unit + oms.extra_discount).toFixed(2),
						discountPercentage: (
							100 *
							((-1 * oms.extra_discount) / oms.price_unit)
						).toFixed(2)
					};
					return obj;
				});
				const ids = ordersData.map((data) => data.id);
				previewHandler(
					generateString("char", 3) + "-" + generateString("num", 3)
				);
				setIds(ids);
				setData(transfromedData);
			} catch (e) {
			} finally {
			}
		};
		fetchOrders();
	}, [vendor, startDate, endDate]);
	function generateString(type, length) {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const numbers = "123456789";
		let result = "";
		const charactersLength = characters.length;
		const numbersLength = numbers.length;
		if (type == "char") {
			for (let i = 0; i < length; i++) {
				result += characters.charAt(
					Math.floor(Math.random() * charactersLength)
				);
			}
			return result;
		}
		if (type == "num") {
			for (let i = 0; i < length; i++) {
				result += numbers.charAt(Math.floor(Math.random() * numbersLength));
			}
			return result;
		}
	}

	const getTotal = () => {
		let total = 0;
		let quantity = 0;
		data.forEach((data) => {
			total += data.price_unit;
			quantity += data.product_uom_qty;
		});
		return [total, quantity];
	};

	return (
		<div>
			<Grid container>
				<Grid item xs={12}>
					<Container maxWidth="md">
						<Paper>
							<div className={classes.formWrapper}>
								<Grid
									container
									direction="row"
									justifyContent="flex-end"
									alignItems="flex-start"
									spacing={2}
								>
									<Grid
										container
										direction="row"
										justifyContent="flex-end"
										alignItems="flex-start"
										item
										xs={12}
									>
										<Typography variant="h5">
											Preview Number:
											{preview}
										</Typography>
									</Grid>
								</Grid>
								<Grid container className={classes.stats} spacing={2}>
									<Grid item xs={12}>
										<Typography variant="h5">Name: {vendorName}</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography variant="h5">Email: {vendorEmail}</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography variant="h5">
											Address: {vendorAddress}
										</Typography>
									</Grid>
								</Grid>
								<Grid
									container
									direction="row"
									justifyContent="flex-start"
									alignItems="flex-start"
									className={classes.statsTop}
								>
									<Grid item xs={4} md={2}>
										<Typography variant="h5">
											Total Price: {data ? getTotal()[0] : ""}
										</Typography>
									</Grid>

									<Grid item xs={4} md={2}>
										<Typography variant="h5">
											Total Quantity: {data ? getTotal()[1] : ""}
										</Typography>
									</Grid>
								</Grid>
								<TableContainer>
									<Table className={classes.table} aria-label="simple table">
										<TableHead>
											<TableRow>
												{headers.map((header) => {
													return (
														<TableCell
															key={header.value}
															className={classes.tableCell}
														>
															{header.label}
														</TableCell>
													);
												})}
											</TableRow>
										</TableHead>
										<TableBody>
											{data &&
												data.map((row, index) => (
													<>
														<TableRow key={index}>
															{headers.map((header, headerIndex) => {
																if (header.value === "discount") {
																	if (isNaN(row[header.value])) {
																		row[header.value] = 0;
																	}
																}
																if (header.value === "discountPercentage") {
																	if (isNaN(row[header.value])) {
																		row[header.value] = 0;
																	}
																}
																return (
																	<TableCell
																		className={classes.tableCell}
																		key={headerIndex}
																	>
																		{row[header.value]}
																	</TableCell>
																);
															})}
														</TableRow>
													</>
												))}
										</TableBody>
									</Table>
								</TableContainer>
							</div>
						</Paper>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};

export default OrderPreviews;
