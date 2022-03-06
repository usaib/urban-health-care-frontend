import React, { useContext, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import { Person as AccountIcon } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Grid, Menu } from "@material-ui/core";
import makeStyles from "./styles";
import clsx from "clsx";
import { SignOut } from "../../services/auth";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import users from "./users.png";

function AppBarWrapper({ toggleDrawer, isDrawerOpen }) {
	const classes = makeStyles();
	const authContext = useContext(AuthContext);

	const [profileMenu, setProfileMenu] = useState(null);
	const navigate = useNavigate();
	const handleSignOut = async () => {
		await SignOut({ email: authContext.userEmail });
		authContext.logout();
		navigate("/", { replace: true });
	};

	return (
		<AppBar position="fixed" className={clsx(classes.appBar)}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={toggleDrawer}
					edge="start"
					className={clsx(classes.menuButton)}
				>
					{isDrawerOpen ? <ArrowBackIcon /> : <MenuIcon />}
				</IconButton>
				<Typography className={classes.typo} variant="h3" weight="medium">
					{"Urban Health Centre"}
				</Typography>
				<IconButton
					aria-haspopup="true"
					color="inherit"
					className={classes.headerMenuButton}
					aria-controls="profile-menu"
					onClick={(e) => setProfileMenu(e.currentTarget)}
				>
					<img src={users} className={classes.userIcon}></img>
				</IconButton>
				<Menu
					id="profile-menu"
					open={Boolean(profileMenu)}
					anchorEl={profileMenu}
					onClose={() => setProfileMenu(null)}
					className={classes.headerMenu}
					classes={{ paper: classes.profileMenu }}
					disableAutoFocusItem
				>
					<div className={classes.profileMenuUser}>
						<Typography color="primary">{authContext.userEmail}</Typography>
						<Typography color="primary">Admin</Typography>

						<Grid container direction="row" alignItems="center">
							<Typography
								className={classes.profileMenuLink}
								color="primary"
								onClick={handleSignOut}
							>
								Sign Out{" "}
								<ExitToAppIcon
									style={{ position: "relative", top: "5px" }}
								></ExitToAppIcon>
							</Typography>
						</Grid>
					</div>
				</Menu>
			</Toolbar>
		</AppBar>
	);
}

export default AppBarWrapper;
