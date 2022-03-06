import React from "react";

import { Typography, TableCell } from "@material-ui/core";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import {
	ArrowDownwardOutlined as ArrowDownwardIcon,
	SearchOutlined as SearchIcon
} from "@material-ui/icons";
import { FindInPage } from "@material-ui/icons";
import FilterPopover from "./FilterPopover";

const useStyles = makeStyles((theme) => ({
	/* Styles applied to the root element. */
	root: {
		width: "100%",
		cursor: "pointer",
		display: "inline-flex",
		justifyContent: "space-between",
		flexDirection: "inherit",
		alignItems: "center",
		"&$active": {
			color: theme.palette.text.primary,
			// && instead of & is a workaround for https://github.com/cssinjs/jss/issues/1045
			"&& $icon": {
				opacity: 1,
				color: theme.palette.primary.main
			}
		}
	},

	sortableCell: {
		"&:focus": {
			color: theme.palette.text.secondary
		},
		"&:hover": {
			color: theme.palette.text.secondary,
			"& $icon": {
				opacity: 0.5
			}
		}
	},

	/* Pseudo-class applied to the root element if `active={true}`. */
	active: {},

	searchIcon: {
		fontSize: 24,
		marginRight: 4,
		marginLeft: 4,
		userSelect: "none",
		color: theme.palette.text.secondary
	},

	activeSearch: {
		color: "#000000"
	},

	/* Styles applied to the icon component. */
	icon: {
		fontSize: 18,
		marginLeft: 4,
		marginRight: "auto",
		opacity: 0,
		transition: theme.transitions.create(["opacity", "transform"], {
			duration: theme.transitions.duration.shorter
		}),
		userSelect: "none"
	},

	/* Styles applied to the icon component if `direction="desc"`. */
	iconDirectionDesc: {
		"&& $icon": {
			transform: "rotate(0deg)"
		}
	},

	/* Styles applied to the icon component if `direction="asc"`. */
	iconDirectionAsc: {
		"&& $icon": {
			transform: "rotate(180deg)"
		}
	}
}));

const TableHeaderCell = ({
	children: header,
	sorter,
	sorterHandler,
	filter,
	filterHandler,
	filterType,
	getOptionsData,
	initialFilter,
	omsOptions
}) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const onHeaderSort = () => {
		if (header.isSortable) {
			sorterHandler({
				sortBy: header.value,
				sortOrder: sorter.sortOrder === "asc" ? "desc" : "asc"
			});
		}
	};

	return (
		<TableCell>
			<div className={classNames(classes.root, {})}>
				<Typography onClick={onHeaderSort}>{header.label}</Typography>
				{header.isSortable && (
					<ArrowDownwardIcon
						className={classNames(classes.icon)}
						onClick={onHeaderSort}
					/>
				)}
				{header.filterKey &&
					(filter[header.filterKey] ? (
						<FindInPage
							className={classNames(classes.searchIcon, {
								[classes.activeSearch]: filter[header.filterKey]
							})}
							onClick={(e) => setAnchorEl(e.currentTarget)}
						/>
					) : (
						<SearchIcon
							className={classNames(classes.searchIcon, {
								[classes.activeSearch]: filter[header.filterKey]
							})}
							onClick={(e) => setAnchorEl(e.currentTarget)}
						/>
					))}

				<FilterPopover
					key={header.value}
					anchorEl={anchorEl}
					open={open}
					onClose={() => setAnchorEl(null)}
					header={header}
					filter={filter}
					filterHandler={filterHandler}
					filterType={filterType}
					getOptionsData={getOptionsData}
					initialFilter={initialFilter}
					omsOptions={omsOptions}
				/>
			</div>
		</TableCell>
	);
};

export default TableHeaderCell;
