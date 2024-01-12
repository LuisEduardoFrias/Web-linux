/** @format */

import React, { useState } from "react";

export default function DateTime() {
	function timer() {
		const date = new Date().toLocaleDateString("es-DO");
		const time = new Date().toLocaleTimeString("es-DO");
		return `${time} ${date}`;
	}

	const [datetime, setDatetime] = useState(timer());

	new Promise((resolve, reject) => {
		setTimeout(() => {
			setDatetime(timer());
		}, 1000);
	});

	const _styles: React.CSSProperties = {
		fontSize: "11px",
		whiteSpace: "nowrap",
		paddingRight: "10px"
	};

	return <span style={_styles}>{datetime}</span>;
}
