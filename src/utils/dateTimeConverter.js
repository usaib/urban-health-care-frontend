import moment from "moment";
export const dateTimeConverter = (start, end, week, split) => {
	let startMonth = parseInt(start.getMonth()) + 1;
	let endMonth = parseInt(end.getMonth()) + 1;
	let startDate = parseInt(start.getDate());
	let endDate = parseInt(end.getDate());
	if (startDate < 10) {
		startDate = "0" + startDate;
	}
	if (endDate < 10) {
		endDate = "0" + endDate;
	}
	if (startMonth < 10) {
		startMonth = "0" + startMonth;
	}
	if (endMonth < 10) {
		endMonth = "0" + endMonth;
	}

	let sd =
		start.getFullYear() + "-" + startMonth + "-" + startDate + "T00:00:01.000Z";
	let ed =
		end.getFullYear() + "-" + endMonth + "-" + endDate + "T23:59:59.000Z";
	sd = new Date(sd);
	sd.setHours(sd.getHours() - 5);
	sd = moment(sd).toISOString();

	ed = new Date(ed);
	ed.setHours(ed.getHours() - 5);
	ed = moment(ed).toISOString();

	if (week) {
		sd = moment(sd).subtract(7, "d").toISOString();
	}
	if (split) {
		ed = ed.split(".")[0];
		sd = sd.split(".")[0];
	}

	return {
		sd,
		ed
	};
};
