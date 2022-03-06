import { Outlet } from "react-router";
import { useContext, useState } from "react";
// components
import { AppBar } from "../AppBar";
import { Drawer } from "../Drawer";
import makeStyles from "./styles";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function DashboardLayout() {
	const authContext = useContext(AuthContext);
	const classes = makeStyles();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const toggleDrawer = () => {
		setDrawerOpen((prevState) => !prevState);
	};
	return (
		<>
			<Helmet>
				<title>Dashboard | Order Manager</title>
			</Helmet>
			{authContext.isLoggedIn ? (
				<div className={classes.root}>
					<AppBar toggleDrawer={toggleDrawer} isDrawerOpen={drawerOpen} />
					<Drawer open={drawerOpen} />
					<div className={classes.wrapper}>
						<div className={classes.contentContainer}>
							<main className={classes.content}>
								<Outlet />
							</main>
						</div>
					</div>
				</div>
			) : (
				<Navigate to={{ pathname: "/" }} replace />
			)}
		</>
	);
}

export default DashboardLayout;
