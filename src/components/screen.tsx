/** @format */

import React from "react";
import useSize from "hk/use_size";

interface IScreenProps {
	children: React.ReactNode;
}

export default function Screen(props: IScreenProps) {
	const size = useSize();

	const _style: React.CSSProperties = {
		width: `${size.width}px`,
		height: `${size.height}px`,
		position: "relative",
		background: "rgb(2,0,36)",
		background:
			"linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(89,89,255,1) 50%, rgba(62,126,255,1) 62%, rgba(33,167,255,1) 76%, rgba(0,212,255,1) 91%)",

		display: "flex",
		flexDirection: "column",
		overflow: "hidden"
	};

	return <div style={_style}>{props.children}</div>;
}
