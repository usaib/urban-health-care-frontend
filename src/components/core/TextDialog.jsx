import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	Button,
	Slide,
	FormControlLabel,
	TextField
} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

const Transition = React.forwardRef((props, ref) => (
	<Slide direction="up" ref={ref} {...props} />
));
const TextDialog = ({
	title,
	message,
	state,
	stateHandler,
	submitHandler,
	valueProp,
	showField
}) => {
	const [value, setValue] = React.useState(valueProp);
	const handleClose = () => stateHandler(false);
	const handleSubmit = () => {
		stateHandler(false);
		submitHandler(value);
	};
	const handleChange = (event) => {
		if (event.target.value < 0) {
			event.target.value = 0;
			return;
		} else {
			setValue(event.target.value);
		}
	};

	return (
		<Dialog
			open={state}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
		>
			{title && <DialogTitle>{title}</DialogTitle>}
			<DialogContent>
				<DialogContentText>{message}</DialogContentText>
				{showField && (
					<TextField
						onChange={handleChange}
						label="Quantity"
						type="number"
						min="0"
					/>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleSubmit} color="primary">
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default TextDialog;
