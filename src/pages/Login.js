import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import {
	Box,
	Grid,
	Avatar,
	Typography,
	Container,
	Link
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Button, Toast } from "../components/core";
import { TextField } from "../components/core";
import { Checkbox } from "../components/core";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core";
import SignIn from "../services/auth";
// import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// const provider = new OAuthProvider("microsoft.com");
const SubmitButton = withStyles({
	root: {
		marginTop: 20,
		marginLeft: 2,
		backgroundColor: "#00A36C",
		color: "white",
		"&:hover": {
			backgroundColor: "#00A36C"
		}
	}
})((props) => <Button fullWidth={true} {...props} />);
const initialValues = {
	email: "",
	password: "",
	rememberMe: false
};
const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email("Must be a valid email")
		.max(255)
		.required("Email is required"),
	password: Yup.string().max(255).required("Password is required"),
	rememberMe: Yup.boolean().required()
});
const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",
		backgroundColor: theme.palette.background.paper
	},
	avatar: {
		backgroundColor: theme.palette.primary.main,
		marginTop: theme.spacing(6)
	},
	forgotPass: {
		float: "right",
		cursor: "pointer",
		"&:hover": {
			color: theme.palette.primary.main
		}
	},
	containerLogin: {
		paddingTop: theme.spacing(10),
		backgroundColor: theme.palette.background.paper
	},
	img: {
		minHeight: "70%",
		minWidth: "70%"
	}
}));
function Login() {
	const classes = useStyles();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [toast, setToast] = useState({
		state: "close",
		message: "",
		type: ""
	});
	const authContext = useContext(AuthContext);
	if (authContext.isLoggedIn) {
		return <Navigate to={{ pathname: "/app/dashboard" }} replace></Navigate>;
	}

	const onSubmit = async (values) => {
		setLoading(true);
		try {
			const resp = await SignIn({
				email: values.email,
				password: values.password
			});

			if (resp.data.success) {
				setToast({
					state: "open",
					message: resp.data.message,
					type: "success"
				});
				setTimeout(() => {
					setLoading(false);
					authContext.login(resp.data.data.token, resp.data.data);
					navigate("/app/dashboard/orders", { replace: true });
				}, 1000);
			} else {
				setToast({
					state: "open",
					message: resp.data.data.cause,
					type: "error"
				});
				setLoading(false);
			}
		} catch (e) {
			setLoading(false);
			setToast({
				state: "open",
				message: e.message,
				type: "error"
			});
		}
	};
	return (
		<>
			<Helmet>
				<title>Login | Order Manager</title>
			</Helmet>
			<Box className={classes.root}>
				<Grid container>
					<Grid
						className={classes.containerLogin}
						lg={12}
						md={12}
						sm={12}
						xs={12}
						item
						direction="row"
						justifyContent="flex-end"
						alignItems="center"
					>
						<Grid container spacing={5}>
							<Grid
								item
								container
								direction="column"
								alignItems="center"
								justifyContent="center"
							>
								<Avatar className={classes.avatar}>
									<LockOutlinedIcon />
								</Avatar>
								<Typography component="h1" variant="h3" margin={0.5}>
									Welcome to
								</Typography>
								<Typography component="h1" variant="h4" margin={0.5}>
									Bagallery Sales Dashboard
								</Typography>
								<Typography variant="subtitle2">
									Login into your account
								</Typography>
							</Grid>

							<Grid
								spacing={4}
								container
								item
								direction="column"
								alignItems="center"
								justifyContent="center"
							>
								<Container maxWidth="xs">
									<Formik
										initialValues={initialValues}
										validationSchema={validationSchema}
										onSubmit={onSubmit}
									>
										<Form>
											<TextField
												name="email"
												type="email"
												label="Email"
												autoFocus
												variant="outlined"
												fullWidth={true}
											/>
											<TextField
												name="password"
												type="password"
												label="Password"
												fullWidth={true}
												variant="outlined"
											/>

											<Box py={2}>
												<Button
													fullWidth={true}
													loading={loading}
													type="submit"
													loadingPosition="start"
													startIcon={<LockOpenIcon />}
												>
													Sign In
												</Button>
											</Box>
										</Form>
									</Formik>
								</Container>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

export default Login;
