import React, { useEffect } from "react";
import _ from "lodash";
import { Popover, TextField, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(() => ({
	root: { padding: "1em" },
	buttonsContainer: {
		display: "flex",
		marginTop: "10px",
		justifyContent: "space-between"
	},
	button: {
		width: "105px",
		margin: "2px"
	}
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

function getStyles(name, selectedData, theme) {
	return {
		fontWeight: selectedData.indexOf(name) === -1 ? "normal" : "bold"
	};
}

const FilterPopover = ({
	anchorEl,
	open,
	onClose,
	header,
	filterHandler,
	filterType,
	getOptionsData,
	initialFilter,
	omsOptions
}) => {
	const classes = useStyles();
	const theme = useTheme();
	const [optionsData, setOptionsData] = React.useState([]);
	const [selectedData, setSelectedData] = React.useState(initialFilter);
	const [filterValue, setFilterValue] = React.useState("");

	useEffect(() => {
		if (initialFilter.length) {
			if (header.value == "omsStatus") {
				setSelectedData(initialFilter);
			}
		}
	}, [initialFilter]);
	useEffect(() => {
		async function fetchData() {
			let params;
			try {
				const result = await getOptionsData({
					limit: 1000000,
					offset: 0
				});
				console.log(result);
				setOptionsData(result.data);
			} catch (error) {
				console.log(error);
				setOptionsData([]);
			} finally {
			}
		}
		fetchData();
	}, []);
	const handleChange = (event) => {
		setSelectedData(event.target.value);
	};

	const searchHandler = () => {
		if (!_.isEmpty(selectedData)) {
			if (filterType == "select") {
				filterHandler((prev) => ({
					...prev,
					[header.filterKey]: selectedData
				}));
			}
		}
		if (!_.isEmpty(filterValue)) {
			if (filterType == "text") {
				let transformedFilterValue = filterValue.trim();
				// transform value with respect to header type.
				if (header.type === "numeric" && !Number.isNaN(filterValue)) {
					transformedFilterValue = Number(filterValue);
				}

				filterHandler((prev) => ({
					...prev,
					[header.filterKey]: transformedFilterValue
				}));
			}
		}

		onClose();
	};

	const resetHandler = () => {
		filterHandler((prev) => {
			const { [header.filterKey]: filterKey, ...rest } = prev;
			return rest;
		});
		setFilterValue("");
		setSelectedData([]);
		onClose();
	};

	const renderFilter = (filterType) => {
		if (filterType == "text") {
			return (
				<div>
					<TextField
						type="text"
						name={header.filterKey}
						variant="outlined"
						margin="dense"
						label={`Search ${header.label}`}
						value={filterValue}
						onChange={(e) => setFilterValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								searchHandler();
							}
						}}
						autoFocus
					/>
				</div>
			);
		}
		if (filterType == "select") {
			if (optionsData) {
				return (
					<div>
						<Select
							labelId="demo-mutiple-chip-label"
							id="demo-mutiple-chip"
							multiple
							fullWidth="true"
							value={selectedData || initialFilter}
							onChange={handleChange}
							input={<Input id="select-multiple-chip" />}
							renderValue={(selected) => (
								<div className={classes.chips}>
									{selected.map((value) => (
										<Chip key={value} label={value} className={classes.chip} />
									))}
								</div>
							)}
							MenuProps={MenuProps}
						>
							{optionsData.length &&
								optionsData.map((option) => (
									<MenuItem
										key={option}
										value={option}
										style={getStyles(option, selectedData, theme)}
									>
										{option}
									</MenuItem>
								))}
						</Select>
					</div>
				);
			}
		} else return null;
	};

	return (
		<Popover
			open={open}
			anchorEl={anchorEl}
			onClose={onClose}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center"
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "center"
			}}
		>
			<div className={classes.root}>
				{renderFilter(filterType)}
				<div className={classes.buttonsContainer}>
					<Button
						color="primary"
						variant="contained"
						size="small"
						className={classes.button}
						onClick={searchHandler}
					>
						Search
					</Button>
					<Button
						color="secondary"
						variant="contained"
						size="small"
						className={classes.button}
						onClick={resetHandler}
					>
						Reset
					</Button>
				</div>
			</div>
		</Popover>
	);
};
export default FilterPopover;
