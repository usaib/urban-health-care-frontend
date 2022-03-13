import clsx from "clsx";
import { Box, Button, makeStyles } from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: theme.spacing(1)
	}
}));

const Toolbar = ({ className, userFormHandler, ...rest }) => {
	const classes = useStyles();
	return (
		<div className={clsx(classes.root, className)} {...rest}>
			<Box
				style={{
					display: "flex",
					justifyContent: "flex-end"
				}}
			>
				<Button
					color="primary"
					variant="contained"
					startIcon={<GroupAddIcon />}
					size="medium"
					onClick={() => {
						userFormHandler(true);
					}}
				>
					Add User
				</Button>
			</Box>
		</div>
	);
};

export default Toolbar;
