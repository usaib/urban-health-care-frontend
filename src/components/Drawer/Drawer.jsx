import React, { useContext } from "react";
import makeStyles from "./styles";
import clsx from "clsx";
import { Drawer, List } from "@material-ui/core";
import DrawerList from "./DrawerList";
import Cart from "./medicine.png";
import Stock from "./stock.png";
import Vendor from "./provision.png";

const vendorList = [
	{
		href: "/app/dashboard/orders",
		icon: Cart,
		title: "Orders"
	},
	{
		href: "/app/dashboard/stockHistory",
		icon: Stock,
		title: "Stock History"
	}
];
const adminList = [
	{
		href: "/app/dashboard/orders",
		icon: Cart,
		title: "Medicines"
	},
	{
		href: "/app/dashboard/stockHistory",
		icon: Stock,
		title: "Stock History"
	}
];
function DrawerWrapper({ open }) {
	const role = localStorage.getItem("role");
	const classes = makeStyles();

	const renderSideBar = (role) => {
		if (role == "admin") {
			return adminList.map((sidebar) => {
				return (
					<DrawerList
						href={sidebar.href}
						key={sidebar.title}
						title={sidebar.title}
						icon={sidebar.icon}
						isSidebarOpen={open}
					/>
				);
			});
		} else {
			return vendorList.map((sidebar) => {
				return (
					<DrawerList
						href={sidebar.href}
						key={sidebar.title}
						title={sidebar.title}
						icon={sidebar.icon}
						isSidebarOpen={open}
					/>
				);
			});
		}
	};
	return (
		<div>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open
				})}
				classes={{
					paper: clsx({
						[classes.paper]: true,
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open
					})
				}}
			>
				<div className={classes.DrawerListItems}></div>
				<List>{renderSideBar(role)}</List>
			</Drawer>
		</div>
	);
}

export default DrawerWrapper;
