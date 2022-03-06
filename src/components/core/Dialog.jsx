import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	Button,
	Slide,
	FormControlLabel
} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

const Transition = React.forwardRef((props, ref) => (
	<Slide direction="up" ref={ref} {...props} />
));
const DialogWrapper = ({
	title,
	message,
	state,
	stateHandler,
	submitHandler,
	valueProp,
	options
}) => {
	const radioGroupRef = React.useRef(null);
	const [value, setValue] = React.useState(valueProp);
	const handleClose = () => stateHandler(false);
	const handleSubmit = () => {
		stateHandler(false);
		submitHandler(value);
	};
	const handleChange = (event) => {
		setValue(event.target.value);
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
				<RadioGroup
					ref={radioGroupRef}
					aria-label="ringtone"
					name="ringtone"
					value={value}
					onChange={handleChange}
				>
					{options.map((option) => (
						<FormControlLabel
							value={option}
							key={option}
							control={<Radio />}
							label={option}
						/>
					))}
				</RadioGroup>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					No
				</Button>
				<Button onClick={handleSubmit} color="primary">
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DialogWrapper;
