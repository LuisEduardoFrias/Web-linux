/** @format */

import React from "react";
import useSuperState from "./superState";
import Reducer from "./reducer";

function init() {
	return { name: "luis", age: 17, color: "yellow", volume: 30 };
}

const TuComponente5 = React.memo(function TuComponente5() {
	const [state, dispatch] = useSuperState(Reducer, init(), ["volume", "name"]);
	alert("cp 5 : " + JSON.stringify(state));
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				boxSizen: "border-box",
				padding: "10px",
				gap: "15px",
				color: "white",
				border: "2px solid #dc00ba",
				backgroundColor: "#750063"
			}}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					margin: "3px",
					gap: "5px"
				}}>
				<span>Componente 5</span>
				<hr />
				<div>
					<span>Volume: </span>
					<span>{state.volume}</span>
				</div>
				<br />
				<input
					defaultValue={state.name}
					onChange={event =>
						dispatch({ type: "change_name", value: event.target.value })
					}
				/>
			</div>
		</div>
	);
});

export default TuComponente5;
