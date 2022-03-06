import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
	return <Navigate to={{ pathname: "/app/dashboard" }} replace />;
};

export default PublicRoute;
