import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

function TextFieldWrapper({ name, variant, margin, size, ...otherProps }) {
  const [field, meta] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    margin: margin || "normal",
    size: size || "medium",
  };

  if (variant) {
    configTextfield.variant = variant;
  }

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return <TextField {...configTextfield} />;
}

export default TextFieldWrapper;
