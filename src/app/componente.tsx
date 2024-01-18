/** @format */
"use client";

import React, { Suspense, lazy } from "react";
const YouComponent5 = React.lazy(() => import("./componente5"));
import useSuperState from "./superState";
import Reducer from "./reducer";

function init() {
	return { name: "luis", age: 17, color: "yellow", volume: 30 };
}

export default function YouComponent() {
	const [state, dispatch] = useSuperState(Reducer, init(), ["name", "age"]);
	alert("cp 1 : " + JSON.stringify(state));
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "200px",
				margin: "20px",
				padding: "10px",
				border: "2px solid #6b6868de",
				boxSizen: "border-box",
				gap: "15px",
				color: "white",
				backgroundColor: "#373737"
			}}>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						margin: "3px",
						gap: "5px"
					}}>
					<span>Componente 1 padre </span>
					<hr />
					<div>
						<span>Name: </span>
						<span>{state.name}</span>
					</div>
					<div>
						<span>Age: </span>
						<span>{state.age}</span>
					</div>
				</div>
				<button
					onClick={() => {
						dispatch({ type: "up_age", value: state.age + 1 });
					}}
					style={{ width: "100%" }}>
					Aumental la edad
				</button>
			</div>

			<TuComponente2 />
			<TuComponente3 />
			<TuComponente4 />
		</div>
	);
}

export const YouComponent2 = React.memo(function YouComponent2() {
	const [state, dispatch] = useSuperState(Reducer, init(), ["color"]);
	alert("cp 2 : " + JSON.stringify(state));
	const colors = ["yellow", "red", "blue", "green"];
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
				border: "2px solid #0000d9",
				backgroundColor: "#000073"
			}}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					margin: "3px",
					gap: "5px"
				}}>
				<span>Componente 2</span>
				<hr />
				<div>
					<span>Color: </span>
					<span>{state?.color}</span>
				</div>
				<button
					onClick={() => {
						let index = colors.indexOf(state.color);

						if (index === 3) {
							index = 0;
						} else {
							index++;
						}

						dispatch({ type: "change_color", value: colors[index] });
					}}
					style={{ width: "100%" }}>
					Cambiar color
				</button>
			</div>
		</div>
	);
});

export function YouComponent3() {
	const [state, dispatch] = useSuperState(Reducer, init(), ["color", "age"]);
	alert("cp 3 : " + JSON.stringify(state));
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
				border: "2px solid #00d500",
				backgroundColor: "#007700"
			}}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					margin: "3px",
					gap: "5px"
				}}>
				<span>Componente 3</span>
				<hr />
				<div>
					<span>Color: </span>
					<span>{state?.color}</span>
				</div>
				<span
					style={{
						border: `1px solid ${state.color}`,
						width: "100%",
						height: "15px",
						backgroundColor: `${state.color}`
					}}></span>
				<div>
					<span>Age: </span>
					<span>{state?.age}</span>
				</div>

				<span>{state?.age >= 18 ? "Mayor de edad" : "Menor de edad"}</span>
				<hr />
				<Suspense fallback={<div>Loading...</div>}>
					<YouComponent5 />
				</Suspense>
			</div>
		</div>
	);
}

export const YouComponent4 = React.memo(function YouComponent4() {
	const [state, dispatch] = useSuperState(Reducer, init(), ["volume", "age"]);
	alert("cp 4 : " + JSON.stringify(state));
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
				border: "2px solid #ddd400",
				backgroundColor: "#757000"
			}}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					margin: "3px",
					gap: "5px"
				}}>
				<span>Componente 4</span>
				<hr />
				<button
					onClick={() => {
						dispatch({ type: "up_age", value: state.age - 1 });
					}}
					style={{ width: "100%" }}>
					Disminuir edad
				</button>
				<br />
				<input
					type='range'
					value={state.volume}
					onChange={event => {
						dispatch({ type: "change_volume", value: event.target.value });
					}}
				/>
				<br />
			</div>
		</div>
	);
});
