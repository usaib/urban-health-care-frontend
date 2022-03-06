/* eslint-disable react/no-array-index-key */
import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const SelectWrapper = ({
	name,
	variant,
	options,
	margin,
	onChange,
	...otherProps
}) => {
	const { setFieldValue, values } = useFormikContext();
	const [field, meta] = useField(name);

	const handleChange = (evt) => {
		const { value } = evt.target;
		setFieldValue(name, value);
		if (typeof onChange === "function") {
			onChange(value);
		}
	};

	const configSelect = {
		...field,
		select: true,
		fullWidth: true,
		onChange: handleChange,
		value: values[name],
		margin: margin || "normal",
		...otherProps
	};

	if (variant) {
		configSelect.variant = variant;
	}

	if (meta && meta.touched && meta.error) {
		configSelect.error = true;
		configSelect.helperText = meta.error;
	}

	return (
		<TextField {...configSelect}>
			{Object.keys(options).map((item, pos) => (
				<MenuItem key={pos} value={item}>
					{options[item]}
				</MenuItem>
			))}
		</TextField>
	);
};

export default SelectWrapper;
