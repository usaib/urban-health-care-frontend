import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Button } from "../core";
import { Formik } from "formik";
const useStyles = makeStyles((theme) => ({
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)"
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	},
	size: {
		maxWidth: 290
	}
}));
function CardWrapper() {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<div>
			<Card className={classes.size}>
				<CardContent>
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						Word of the Day
					</Typography>
					<Typography variant="h5" component="h2">
						be{bull}nev{bull}o{bull}lent
					</Typography>
					<Typography className={classes.pos} color="textSecondary">
						adjective
					</Typography>
					<Typography variant="body2" component="p">
						well meaning and kindly.
						<br />
						{'"a benevolent smile"'}
					</Typography>
				</CardContent>
				<CardActions>
					<Formik>
						<Button size="small">Learn More</Button>
					</Formik>
				</CardActions>
			</Card>
		</div>
	);
}

export default CardWrapper;
