import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { matchPath, useLocation, Link } from "react-router-dom";
import makeStyles from "./styles";
import classnames from "classnames";

function DrawerList({ href, icon: Icon, title, isSidebarOpen }) {
	const classes = makeStyles();
	const location = useLocation();
	
	const isLinkActive = href
		? !!matchPath(
				{
					path: href,
					end: false
				},
				location.pathname
		  )
		: false;

	return (
		<ListItem
			className={classes.link}
			component={Link}
			to={href}
			classes={{
				root: classnames(classes.linkRoot, {
					[classes.linkActive]: isLinkActive
				})
			}}
			disableRipple
			button
		>
			<ListItemIcon
				className={classnames(classes.linkIcon, {
					[classes.linkIconActive]: isLinkActive
				})}
			>
				<img src={Icon} className={classes.icon}></img>
			</ListItemIcon>
			<ListItemText
				primary={title}
				classes={{
					primary: classnames(classes.linkText, {
						[classes.linkTextActive]: isLinkActive,
						[classes.linkTextHidden]: !isSidebarOpen
					})
				}}
			/>
		</ListItem>
	);
}

export default DrawerList;
