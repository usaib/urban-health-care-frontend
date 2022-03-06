import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useField, useFormikContext } from "formik";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		overflow: "none",
		minWidth: 190,
		maxWidth: 190,
		marginLeft: 4
	}
}));
export default function DatePicker({ name, margin, format, ...otherProps }) {
	const { setFieldValue, setTouched } = useFormikContext();
	const classes = useStyles();
	const [field, meta] = useField(name);

	const handleChange = (date) => {
		setFieldValue(name, date);
	};

	const handleOpen = () => {
		setTouched({ [name]: true });
	};

	const configDateField = {
		...field,
		fullWidth: false,
		disableToolbar: true,
		margin: margin || "normal",
		variant: "inline",
		format: format || "MM/dd/yyyy",
		onChange: handleChange,
		onOpen: handleOpen,
		InputProps: { readOnly: true, shrink: true },
		...otherProps
	};

	if (meta && meta.touched && meta.error) {
		configDateField.error = true;
		configDateField.helperText = meta.error;
	}

	return (
		<MuiPickersUtilsProvider className={classes.root} utils={DateFnsUtils}>
			<KeyboardDatePicker className={classes.root} {...configDateField} />
		</MuiPickersUtilsProvider>
	);
}
