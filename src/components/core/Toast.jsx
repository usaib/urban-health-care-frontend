import React from "react";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const Toast = ({
	state,
	message,
	type,
	hideDuration,
	setState,
	...otherProps
}) => {
	const configAlert = {
		severity: type,
		elevation: 6,
		variant: "filled"
	};
	const configSnackBar = {
		open: state === "open",
		anchorOrigin: { vertical: "top", horizontal: "right" },
		autoHideDuration: hideDuration || 1500,

		onClose: () => setState({ state: "close", message, type }),
		...otherProps
	};

	return (
		<Snackbar {...configSnackBar}>
			<Alert {...configAlert}>{message}</Alert>
		</Snackbar>
	);
};

export default Toast;
