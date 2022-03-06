import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import * as _ from "lodash";
import { startCase, camelCase } from "lodash";
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
	IconButton
} from "@material-ui/core";
import { MdArrowBack as BackIcon } from "react-icons/md";
import {
	TextField,
	SingleSelect,
	Button,
	Toast,
	Typography
} from "@material-ui/core";
import { getOrdersById } from "../../services/orders";
import { Loader } from "../core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
	formWrapper: {
		margin: theme.spacing(3),
		padding: theme.spacing(3)
	},
	table: {
		minWidth: 550,
		padding: 0
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
	}
}));
const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white
	},
	body: {
		fontSize: 14,
		padding: 3
	}
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover
		},
		padding: 0
	}
}))(TableRow);

const OrderDetails = ({ orderId, detailsHandler }) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [headers, setHeaders] = useState([]);
	useEffect(() => {
		setLoading(true);

		const getOrder = async () => {
			try {
				const resp = await getOrdersById({
					orderId
				});
				const orders = [resp.data.data.data._source];
				const keys = Object.keys(resp.data.data.data._source);
				const dummyHeaders = [];
				keys.forEach((key) => {
					if (
						key.includes("customer") ||
						key.includes("Customer") ||
						key.includes("Type") ||
						key.includes("shopify") ||
						key.includes("payment") ||
						key.includes("tracking") ||
						key.includes("Expense") ||
						key.includes("Ref") ||
						key.includes("id") ||
						key.includes("days") ||
						key.includes("orderId") ||
						key.includes("order_number")
					) {
						return;
					}
					if (key.includes("date") || key.includes("Date")) {
						dummyHeaders.push({
							value: key,
							label: startCase(camelCase(key)),
							type: "date"
						});
					} else {
						dummyHeaders.push({ value: key, label: startCase(camelCase(key)) });
					}
				});
				setHeaders(dummyHeaders);
				setData(orders);
			} catch (e) {
				setLoading(false);
			} finally {
				setLoading(false);
			}
		};
		getOrder();
	}, [orderId]);

	const convertDate = (type, data, header) => {
		if (type == "date") {
			return moment(data[0][header.value]).format("DD MMM, YYYY h:mm:ss A");
		} else {
			return data[0][header.value];
		}
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<Container maxWidth="md">
					<IconButton
						className={classes.icon}
						onClick={() => {
							detailsHandler(false);
							setData([]);
						}}
					>
						<BackIcon />
					</IconButton>

					<Paper>
						<div className={classes.formWrapper}>
							{loading && (
								<div
									className={
										data.length
											? classes.loaderPosition
											: classes.loaderPositionEmpty
									}
								>
									<Loader height={50} />
								</div>
							)}
							<TableContainer>
								<Table className={classes.table} aria-label="simple table">
									<TableHead>
										<TableRow>
											<StyledTableCell>Label</StyledTableCell>
											<StyledTableCell>Values</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{data[0] &&
											headers.map((header) => {
												return (
													<StyledTableRow key={header.name}>
														<StyledTableCell component="th" scope="row">
															{header.label}
														</StyledTableCell>
														<StyledTableCell>
															{convertDate(header.type, data, header)}
														</StyledTableCell>
													</StyledTableRow>
												);
											})}
									</TableBody>
								</Table>
							</TableContainer>
						</div>
					</Paper>
				</Container>
			</Grid>
		</Grid>
	);
};

export default OrderDetails;
