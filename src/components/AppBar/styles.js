import { makeStyles } from "@material-ui/styles";
export default makeStyles((theme) => ({
	logotype: {
		color: "white",
		marginLeft: theme.spacing(2.5),
		marginRight: theme.spacing(2.5),
		fontWeight: 500,
		fontSize: 18,
		whiteSpace: "nowrap",
		[theme.breakpoints.down("xs")]: {
			display: "none"
		}
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		borderRadius: "0px",
		textAlign: "center"
	},
	typo: {
		flexGrow: 1,
		textAlign: "center"
	},
	menuButton: {
		marginRight: 36
	},
	toolbar: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		minHeight: 55
	},
	hide: {
		display: "none"
	},
	grow: {
		flexGrow: 1
	},

	headerMenu: {
		marginTop: theme.spacing(4.5)
	},
	headerMenuList: {
		display: "flex",
		flexDirection: "column"
	},
	headerMenuItem: {
		"&:hover, &:focus": {
			backgroundColor: theme.palette.background.light
		}
	},
	headerMenuButton: {
		marginLeft: theme.spacing(2),
		padding: theme.spacing(0.5)
	},
	headerMenuButtonSandwich: {
		marginLeft: 3,
		[theme.breakpoints.down("sm")]: {
			marginLeft: 0
		},
		padding: theme.spacing(0.5)
	},
	headerMenuButtonCollapse: {
		marginRight: theme.spacing(2)
	},
	headerIcon: {
		fontSize: 28
	},
	userIcon: {
		maxHeight: "36px"
	},

	profileMenu: {
		minWidth: 240,
		minHeight: 120,
		overflow: "auto"
	},
	profileMenuUser: {
		display: "flex",
		flexDirection: "column",
		padding: theme.spacing(2)
	},
	profileMenuItem: {
		color: theme.palette.text.hint
	},
	profileMenuIcon: {
		marginRight: theme.spacing(2),
		color: theme.palette.text.hint,
		"&:hover": {
			color: theme.palette.primary.main
		}
	},
	profileMenuLink: {
		fontSize: 16,
		textDecoration: "none",
		"&:hover": {
			cursor: "pointer"
		},
		marginTop: theme.spacing(0)
	}
}));
