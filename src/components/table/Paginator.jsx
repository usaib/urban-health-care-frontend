import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: "0em"
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	pageSelect: {
		fontSize: 14,
		height: 35,
		maxWidth: 117
	},
	pageSelectItem: {
		fontSize: 14
	}
}));

const Paginator = ({ totalRecords, paginator, paginatorHandler }) => {
	const classes = useStyles();
	const [recordsPerPage, setRecordsPerPage] = useState(paginator.limit);
	const handlePageChange = (e, page) => {
		paginatorHandler({ ...paginator, offset: paginator.limit * (page - 1) });
	};
	const handlePagePerRecordChange = (e) => {
		setRecordsPerPage(e.target.value);
		paginatorHandler({ limit: e.target.value, offset: 0 });
	};

	return (
		<Grid
			container
			justify="flex-end"
			alignItems="center"
			className={classes.root}
		>
			<Pagination
				count={Math.ceil(totalRecords / paginator.limit)}
				variant="outlined"
				shape="rounded"
				color="primary"
				page={paginator.offset / paginator.limit + 1}
				onChange={handlePageChange}
			/>
			<FormControl
				margin="dense"
				variant="outlined"
				className={classes.formControl}
			>
				<Select
					value={recordsPerPage}
					className={classes.pageSelect}
					onChange={handlePagePerRecordChange}
				>
					<MenuItem value={10} className={classes.pageSelectItem}>
						10 / Page
					</MenuItem>
					<MenuItem value={20} className={classes.pageSelectItem}>
						20 / Page
					</MenuItem>
					<MenuItem value={50} className={classes.pageSelectItem}>
						50 / Page
					</MenuItem>
					<MenuItem value={100} className={classes.pageSelectItem}>
						100 / Page
					</MenuItem>
				</Select>
			</FormControl>
		</Grid>
	);
};

export default Paginator;
