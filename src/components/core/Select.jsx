import { Checkbox, Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useField, useFormikContext } from "formik";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
	root: {
		overflow: "none",
		minWidth: 180,
		maxWidth: 180,
		marginLeft: 10
	}
}));

const MultiSelectWrapper = ({
	name,
	variant,
	margin,
	options,
	...otherProps
}) => {
	const classes = useStyles();
	const { setFieldValue, values } = useFormikContext();
	
	const [field, meta] = useField(name);
	const handleChange = (evt, selectedOptions) => {
		if (selectedOptions) {
			setFieldValue(name, selectedOptions);
		}
	};

	const configMultiSelect = {
		...field,
		fullWidth: true,
		onChange: handleChange,
		margin: margin || "normal",
		...otherProps
	};

	if (variant) {
		configMultiSelect.variant = variant;
	}

	if (meta && meta.touched && meta.error) {
		configMultiSelect.error = true;
		configMultiSelect.helperText = meta.error;
	}

	return (
		<Autocomplete
			multiple
			includeInputInList
			value={values[name]}
			options={options}
			getOptionLabel={(option) => option.label}
			getOptionSelected={(option, value) => option.value === value.value}
			renderTags={(value, getTagProps) =>
				value.map((option, index) => (
					<Chip
						color="primary"
						label={option.label}
						{...getTagProps({ index })}
					/>
				))
			}
			renderOption={(option, { selected }) => (
				<>
					<Checkbox checked={selected} />
					{option.label}
				</>
			)}
			renderInput={(params) => (
				<TextField
					className={classes.root}
					{...params}
					{...configMultiSelect}
				/>
			)}
			onChange={handleChange}
		/>
	);
};

export default MultiSelectWrapper;
