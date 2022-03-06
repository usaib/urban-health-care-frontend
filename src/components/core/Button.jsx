import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { useFormikContext } from "formik";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
	root: {
		borderRadius: "20px"
	}
}));

const ButtonWrapper = ({ children, ...otherProps }) => {
	const classes = useStyles();
	const { submitForm } = useFormikContext();

	const handleSubmit = () => {
		submitForm();
	};

	const configButton = {
		variant: "contained",
		color: "primary",
		fullWidth: false,
		onClick: handleSubmit,
		...otherProps,
		startIcon: otherProps.loading || otherProps.startIcon
	};

	return (
		<Button
			className={classes.root}
			{...configButton}
			disabled={configButton.loading}
		>
			{configButton.loading && <CircularProgress size={20} />}
			{!configButton.loading && children}
		</Button>
	);
};

export default ButtonWrapper;
