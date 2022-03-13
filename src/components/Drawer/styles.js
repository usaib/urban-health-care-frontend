import { makeStyles } from "@material-ui/styles";
const drawerWidth = 180;
export default makeStyles((theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap"
	},
	paper: {
		background: ""
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9) + 1
		}
	},
	DrawerListItems: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar
	},
	//Drawer Link Styles

	linkActive: {
		backgroundColor: "theme.palette.background.dark"
	},
	linkIcon: {
		color: theme.palette.text.secondary,
		transition: theme.transitions.create("color"),
		display: "flex",
		justifyContent: "center"
	},
	linkIconActive: {
		color: theme.palette.primary.main
	},
	linkText: {
		color: theme.palette.text.secondary,
		transition: theme.transitions.create(["opacity", "color"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		fontSize: 15.5,
		"&:hover": {
			color: theme.palette.primary.main
		}
	},
	linkTextActive: {
		color: "black"
	},
	linkTextHidden: {
		opacity: 0
	},
	icon: {
		maxHeight: "28px"
	}
}));
