import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import * as _ from "lodash";
import {
	Box,
	Grid,
	Container,
	makeStyles,
	Paper,
	IconButton
} from "@material-ui/core";
import { MdArrowBack as BackIcon } from "react-icons/md";
import { createMedicine } from "../../services/inventory";
import { updateMedicine } from "../../services/inventory";

import { TextField, SingleSelect, Button, Toast } from "../core";

const useStyles = makeStyles((theme) => ({
	formWrapper: {
		margin: theme.spacing(3),
		padding: theme.spacing(3)
	},
	icon: {
		fontSize: 25,
		color: theme.palette.primary.main,
		cursor: "pointer",
		float: "right"
	}
}));

const MedicineForm = ({ Medicine, medicineHandler, medicineFormHandler }) => {
	const classes = useStyles();
	const [vendors, setVendors] = useState({});
	const [loading, setLoading] = useState(false);
	const [toast, setToast] = useState({
		state: "close",
		message: "",
		type: ""
	});

	const initialValues = Medicine || {
		name: "",
		type: "",
		quantity: "",
		distributor: "",
		company: "",
		expiryDate: ""
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().max(150).required("Name is required"),
		type: Yup.string()

			.max(255)
			.required("type is required"),
		quantity: Yup.number().required("Quantity is required"),
		company: Yup.string().required("company is required"),
		distributor: Yup.string().required("distributor is required"),
		expiryDate: Yup.date().required("expiryDate is required")
	});

	const onSubmit = async (values, { resetForm }) => {
		setLoading(true);

		let resp;
		if (Medicine) {
			resp = await updateMedicine({
				...values
			});
		} else {
			console.log("data", values);
			resp = await createMedicine({
				...values,
				token: localStorage.getItem("token", 0)
			});
		}
		if (resp.data.success) {
			setToast({
				state: "open",
				message: resp.data.message,
				type: "success"
			});
			if (Medicine) {
				setTimeout(() => {
					resetForm();
					medicineFormHandler(false);
				}, 500);
			} else {
				resetForm();
			}
		} else {
			setToast({
				state: "open",
				message: resp.data.message,
				type: "error"
			});
		}

		setLoading(false);
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<Container maxWidth="md">
					<Toast {...toast} setState={setToast} />
					<IconButton
						className={classes.icon}
						onClick={() => {
							medicineFormHandler(false);
							medicineHandler(null);
						}}
					>
						<BackIcon />
					</IconButton>
					<Paper>
						<div className={classes.formWrapper}>
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
							>
								{(props) => (
									<Form>
										<Grid container spacing={2}>
											<Grid item xs={12}>
												<TextField name="name" label="Name" required />
											</Grid>
											<Grid item xs={12}>
												<TextField name="type" label="Type" required />
											</Grid>

											{!Medicine && (
												<Grid item xs={6}>
													<TextField
														name="quantity"
														label="Quantity"
														min="0"
														required
													/>
												</Grid>
											)}
											<Grid item xs={6}>
												<TextField name="company" label="Company" required />
											</Grid>
											<Grid item xs={6}>
												<TextField
													name="distributor"
													label="Distributor"
													required
												/>
											</Grid>
											<Grid item xs={6}>
												<TextField
													name="expiryDate"
													label="Expiry Date"
													type="date"
													required
												/>
											</Grid>
											<Grid item xs={12}>
												<Box py={2}>
													<Button
														type="submit"
														loading={loading}
														loadingPosition="start"
													>
														{Medicine ? "Update Medicine" : "Create Medicine"}
													</Button>
												</Box>
											</Grid>
										</Grid>
									</Form>
								)}
							</Formik>
						</div>
					</Paper>
				</Container>
			</Grid>
		</Grid>
	);
};

export default MedicineForm;
