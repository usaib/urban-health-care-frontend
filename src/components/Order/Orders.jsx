import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Box, Container, makeStyles, Chip } from "@material-ui/core";
import Table from "../table/Table";
import getOrders from "../../services/orders";
import { getInventory } from "../../services/inventory";

import { fetchOptions } from "../../services/orders";
import AuthContext from "../../context/AuthContext";
import moment from "moment";
import OrderDetails from "./OrderDetails";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: "100%",
		paddingBottom: theme.spacing(2),
		paddingTop: theme.spacing(2)
	}
}));
const headers = [
	// {
	// 	label: "Order No.",
	// 	value: "order_number",
	// 	filterKey: "order_number",
	// 	filterType: "text",
	// 	type: "numeric"
	// },
	// { label: "Product Name", value: "productName" },
	// { label: "Sku", value: "sku", filterKey: "sku", filterType: "text" },

	// {
	// 	label: "Brand",
	// 	value: "brand",
	// 	filterKey: "brand",
	// 	filterType: "select"
	// },
	// {
	// 	label: "Vendor",
	// 	value: "vendor",
	// 	filterKey: "vendor",
	// 	filterType: "select"
	// },
	// { label: "Unit Price", value: "price_unit", type: "numeric" },
	// {
	// 	label: "Quantity",
	// 	value: "product_uom_qty"
	// },
	// {
	// 	label: "Discounted Price",
	// 	value: "discount"
	// },
	// {
	// 	label: "Discount Percentage (%)",
	// 	value: "discountPercentage"
	// },
	// {
	// 	label: "Shipment Status",
	// 	value: "shipmentStatus",
	// 	filterKey: "shipmentStatus",
	// 	filterType: "select"
	// },
	// {
	// 	label: "Order Date",
	// 	value: "order_date",
	// 	type: "date"
	// },

	// {
	// 	label: "OMS Status",
	// 	value: "omsStatus",
	// 	filterKey: "omsStatus",
	// 	filterType: "select"
	// },

	// {
	// 	label: "Order Status",
	// 	value: "orderStatus",
	// 	filterKey: "orderStatus",
	// 	filterType: "text"
	// },
	// {
	// 	label: "Days Left",
	// 	value: "daysLeft"
	// },
	{ label: "Name", value: "name" },
	{ label: "Type", value: "type" },
	{ label: "Quantity", value: "quantity" },
	{ label: "Status", value: "status" },
	{ label: "Company", value: "company" },
	{ label: "Distributor", value: "distributor" },
	{ label: "Consumed", value: "consumed" },
	{ label: "Balance", value: "balanced" },
	{ label: "Expiry Date", value: "expiryDate", type: "date" }
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
const setTats = async () => {
	// const token = localStorage.getItem("token", 0);
	// const resp = await getAllVendors({ limit: 1000, offset: 0, token });
	// const vendors = resp.data.data.data.rows;
	// vendors.forEach((vendor) => {
	// 	localStorage.setItem(`${vendor.name + "tot"}`, vendor.tot);
	// });
};
setTats();
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
	const [isOrderDetailsVisible, setOrderDetailsVisible] = useState(false);
	const [orderId, setOrderId] = useState("");
	const fetchOrders = async (params) => {
		const token = localStorage.getItem("token", 0);
		let vendor = [];
		vendor.push(localStorage.getItem("vendor"));
		console.log("params", params);
		console.log("vendors", vendor);
		params.token = token;
		params.vendor = vendor;
		console.log(params);
		const resp = await getOrders(params);
		let orderCount,
			pendingCount,
			delayedCount,
			fulfilledCount,
			paidCount,
			readyCount,
			receivedCount,
			returnedCount,
			returnedReceivedCount,
			inboundCount,
			dispatchedCount,
			cancelCount;
		if (params.offset == 0 && params.getAggregations) {
			orderCount = resp.data.data.data.aggregations.stats.order_count.value;
			pendingCount = resp.data.data.data.aggregations.stats.Pending.doc_count;
			delayedCount = resp.data.data.data.aggregations.stats.Delayed.doc_count;
			fulfilledCount =
				resp.data.data.data.aggregations.stats.Fulfilled.doc_count;
			paidCount = resp.data.data.data.aggregations.stats.Paid.doc_count;
			readyCount =
				resp.data.data.data.aggregations.stats.Ready_to_pickup.doc_count;
			receivedCount =
				resp.data.data.data.aggregations.stats.Received_at_warehouse.doc_count;
			cancelCount = resp.data.data.data.aggregations.stats.Cancel.doc_count;
			returnedCount = resp.data.data.data.aggregations.stats.Returned.doc_count;
			returnedReceivedCount =
				resp.data.data.data.aggregations.stats.Returned_Received.doc_count;
			inboundCount = resp.data.data.data.aggregations.stats.Inbound.doc_count;
			dispatchedCount =
				resp.data.data.data.aggregations.stats.Dispatched.doc_count;
		}
		const orders = resp.data.data.data.hits.hits;
		const data = orders.map((order) => {
			return order._source;
		});
		let selectOptions = [];
		data.forEach((obj) => {
			selectOptions.push(obj.id.toString());
		});
		const transfromedData = data.map((oms) => {
			let obj = {
				...oms,
				daysLeft: checkStatusToShowDaysLeft(oms.omsStatus) ? (
					<Chip
						key={oms.id}
						label={daysLeft(oms.vendor, oms.order_date)[0]}
						style={{
							margin: "0.1rem",
							backgroundColor: daysLeft(oms.vendor, oms.order_date)[1]
								? "	#00FF00"
								: "#FF0000",
							color: "#000000"
						}}
						size="large"
					/>
				) : (
					""
				),
				omsStatus: (
					<Chip
						key={oms.omsStatus}
						label={
							checkStatusIsDelayed(oms.omsStatus)
								? oms.omsStatus + " " + oms.delayedDays
								: oms.omsStatus || "Pending"
						}
						style={{ margin: "0.1rem" }}
						color="primary"
						size="large"
					/>
				),
				discount: (oms.price_unit + oms.extra_discount).toFixed(2),
				discountPercentage: (
					100 *
					((-1 * oms.extra_discount) / oms.price_unit)
				).toFixed(2)
			};
			return obj;
		});

		return {
			total: resp.data.data.data.hits.total.value,
			data: transfromedData,
			options: selectOptions,
			count: orderCount,
			pendingCount,
			delayedCount,
			fulfilledCount,
			returnedCount,
			returnedReceivedCount,
			inboundCount,
			dispatchedCount,
			paidCount,
			readyCount,
			receivedCount,
			cancelCount
		};
	};
	const fetchInventory = async (params) => {
		const resp = await getInventory(params);
		const inventory = resp.data.data.data.rows;
		let selectOptions = [];
		inventory.forEach((obj) => {
			selectOptions.push(obj.id.toString());
		});
		console.log(resp);

		return {
			data: inventory,
			options: selectOptions,
			total: resp.data.data.data.count,
			count: resp.data.data.data.count
		};
	};

	const fetchOrdersCount = async (params) => {};
	const getOptions = async (params) => {
		const token = localStorage.getItem("token", 0);
		params.token = token;
		const resp = await fetchOptions(params);
		let optionsData;
		if (params.optionName == "Brands") {
			optionsData = resp.data.data.aggregations.brands.buckets;
		}
		if (params.optionName == "Vendors") {
			optionsData = resp.data.data.aggregations.vendor.buckets;
		}
		if (params.optionName == "ShipmentStatus") {
			optionsData = resp.data.data.aggregations.shipmentStatus.buckets;
		}
		if (!params.optionName) {
			return;
		}
		let transformedValues = optionsData.map((dataObj) => dataObj.key);
		if (params.optionName == "Vendors") {
		}
		return {
			data: transformedValues
		};
	};
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
	const tableProps = {
		headers: getHeaders(authContext.role),
		getData: fetchInventory,
		getOptionsData: getOptions,
		dateFilters: true,
		omsOptions: getOmsOptions(authContext.role),
		omsOptionsWithColours: getOmsOptionsColours(authContext.role),
		getOrdersCount: fetchOrdersCount,
		onDetails: (details) => {
			setOrderId(details.id);
			setOrderDetailsVisible(true);
		}
	};

	return (
		<div>
			<Helmet>
				<title>Urban Health Care | Dashboard</title>
			</Helmet>
			{isOrderDetailsVisible ? (
				<OrderDetails
					orderId={orderId}
					detailsHandler={setOrderDetailsVisible}
				/>
			) : (
				<Box className={classes.root}>
					<Container maxWidth={false}>
						<Table {...tableProps} />
					</Container>
				</Box>
			)}
		</div>
	);
}

export default Orders;
