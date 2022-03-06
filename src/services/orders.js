import axios from "axios";
import { dateTimeConverter } from "../utils/dateTimeConverter";
import "dotenv/config";
const today = new Date();
const { sd, ed } = dateTimeConverter(today, today, true);
const url = "http://18.119.70.158:5001";
const getOrders = async (params) => {
	let body = {
		size: params.limit,
		from: params.offset,
		gte: new Date(params.gte).toISOString(),
		lte: new Date(params.lte).toISOString(),
		withCount: params.withCount,
		getAggregations: params.getAggregations,
		...params.filters
	};
	if (params.vendor && params.vendor[0] !== null) {
		body.vendor = params.vendor;
	}

	return axios.post(`${url}/order/getOrders`, body, {
		headers: {
			Authorization: "Bearer " + params.token
		}
	});
};

export const getOrdersById = async (params) => {
	let body = {
		id: params.orderId
	};
	return axios.post(`${url}/order/getOrdersById`, body, {
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token", 0)
		}
	});
};

export const updateOmsStatus = async (params) => {
	let data = "";
	let dataString = `{ "omsStatus":"${params.omsStatusVal}","delayedDays":"${params.days}","omsStatusUpdatedOn":"${params.omsStatusUpdatedOn}","omsStatusUpdatedBy":"${params.omsStatusUpdatedBy}"}\n`;
	for (let i = 0; i < params.lineItemIds.length; i++) {
		let indexString = `{ "index":{ "_index":"oms-status", "_id":"${params.lineItemIds[i]}"}}\n`;
		data += indexString + dataString;
	}
	const body = {
		ids: params.lineItemIds,
		omsStatus: params.omsStatusVal,
		delayedDays: params.days,
		omsStatusUpdatedBy: params.omsStatusUpdatedBy,
		omsStatusUpdatedOn: params.omsStatusUpdatedOn,
		data: data
	};
	return axios.post(`${url}/order/updateOmsStatus`, body, {
		headers: {
			Authorization: "Bearer " + params.token
		}
	});
};

export const updatePreviewNumber = (params) => {
	let data = "";
	let dataString = `{"previewNumber":"${params.previewNumber}"}\n`;
	for (let i = 0; i < params.idsForPreviews.length; i++) {
		let indexString = `{ "index":{ "_index":"oms-status", "_id":"${params.idsForPreviews[i]}"}}\n`;
		data += indexString + dataString;
	}
	const body = {
		ids: params.idsForPreviews,
		previewNumber: params.previewNumber,
		data
	};
	return axios.post(`${url}/order/updatePreviewNumber`, body, {
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token", 0)
		}
	});
};

export const sendEmail = async (params) => {
	return axios.post(`http://18.119.70.158:5001/order/email`, params, {
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token", 0)
		}
	});
};
export const fetchOptions = async (params) => {
	let body = {};
	if (params.optionName == "Brands") {
		body = {
			gte: sd,
			lte: ed
		};
	}
	return axios.post(
		`http://3.13.148.32:3001/api/get${params.optionName}`,
		body,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + params.token
			}
		}
	);
};
export default getOrders;
