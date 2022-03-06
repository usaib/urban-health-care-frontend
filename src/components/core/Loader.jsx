import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const LoaderWrapper = ({ type, height, width, color }) => {
	const LoaderColor = color || "black";

	return (
		<Loader
			visible
			type={type || "ThreeDots"}
			color={LoaderColor}
			height={height || 50}
			width={width || 50}
		/>
	);
};

export default LoaderWrapper;
