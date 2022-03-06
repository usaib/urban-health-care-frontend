import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		display: "flex",
		height: "100%",
		overflow: "hidden",
		width: "100%"
	},
	loaderBackground: {
		backgroundColor: theme.palette.primary.main,
		display: "flex",
		height: "100%",
		overflow: "hidden",
		width: "100%"
	},
	loader: {
		position: "fixed",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)"
	},
	wrapper: {
		display: "flex",
		flex: "1 1 auto",
		overflow: "hidden",
		paddingTop: 64
	},
	contentContainer: {
		display: "flex",
		flex: "1 1 auto",
		overflow: "hidden"
	},
	content: {
		flex: "1 1 auto",
		height: "100%",
		overflow: "auto",
		flexGrow: 1
		// padding: theme.spacing(3)
	},
	toolbarSpacing: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar
	}
}));
