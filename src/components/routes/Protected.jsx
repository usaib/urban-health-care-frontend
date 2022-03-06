import React from "react";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	return <Component {...rest} />;
};

export default ProtectedRoute;
