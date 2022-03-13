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
import { createUser } from "../../services/users";
import { updateUser } from "../../services/users";

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

const UserForm = ({ user, userHandler, userFormHandler }) => {
	const classes = useStyles();
	const [vendors, setVendors] = useState({});
	const [loading, setLoading] = useState(false);
	const [toast, setToast] = useState({
		state: "close",
		message: "",
		type: ""
	});

	const initialValues = user || {
		name: "",
		email: "",
		vendor: "",
		password: ""
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().max(150).required("Name is required"),
		email: Yup.string()
			.email("Must be a valid email")
			.max(255)
			.required("Email is required"),
		role: Yup.number().required("Role is required"),
		password: Yup.string().min(
			5,
			"Password must be at least 5 characters or numbers"
		)
	});

	const onSubmit = async (values, { resetForm }) => {
		setLoading(true);

		let resp;
		if (user) {
			resp = await updateUser({
				...values
			});
		} else {
			resp = await createUser({
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
			if (user) {
				setTimeout(() => {
					resetForm();
					userFormHandler(false);
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

	useEffect(() => {
		async function fetchVendors() {
			// const token = localStorage.getItem("token", 0);
			// const resp = await getAllVendors({ limit: 1000, offset: 0, token });
			// const vendors = resp.data.data.data.rows;
			// const userVendors = {};
			// vendors.forEach((vendor) => {
			// 	userVendors[vendor.id] = vendor.name;
			// });
			// setVendors(userVendors);
		}

		// fetchVendors();
	}, []);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Container maxWidth="md">
					<Toast {...toast} setState={setToast} />
					<IconButton
						className={classes.icon}
						onClick={() => {
							userFormHandler(false);
							// userHandler(null);
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
												<TextField
													name="email"
													label="Email"
													type="email"
													required
													disabled={!!user}
												/>
											</Grid>
											<Grid item xs={12}>
												<SingleSelect
													name="role"
													label="Role"
													options={{
														1: "Vendor",
														3: "Finance",
														4: "Purchase",
														5: "Warehouse"
													}}
													required
												/>
											</Grid>
											{props.values.role == 1 && (
												<Grid item xs={6}>
													<SingleSelect
														name="vendor"
														label="Vendor"
														options={vendors}
														required
													/>
												</Grid>
											)}
											<Grid item xs={6}>
												{user ? (
													""
												) : (
													<TextField
														disabled={!!user}
														name="password"
														label="Password"
														required
													/>
												)}
											</Grid>
											<Grid item xs={12}>
												<Box py={2}>
													<Button
														type="submit"
														loading={loading}
														loadingPosition="start"
													>
														{user ? "Update User" : "Create User"}
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

export default UserForm;
