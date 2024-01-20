/** @format */

"use client";
import Icon from "cp/icon";
import styles from "st/volume.module.css";
import { superState } from "hk/use_all_state";
import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";

export default function Volume() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"taskbar",
		"Volume"
	]);
	const { taskbar, setState } = state;
	//	const [taskbar, setState] = superState("taskbar", "Volume");

	const _style = {
		width: "200px",
		height: "50px",
		right: "-30px",
		top: `${taskbar.panel_volume ? "0px" : "-400px"}`,
		opacity: taskbar.panel_volume ? "1" : "0"
	};

	function handleChange(event: any) {
		dispatch({ type: actions.changeVolume, value: event.target.value });
	}

	return (
		<div className={styles.container} style={_style}>
			<div>
				<Icon>volume_off</Icon>
				<Icon>volume_down</Icon>
				<Icon>volume_up</Icon>
				<Icon>brand_awareness</Icon>
			</div>
			<input
				type='range'
				defaultValue={taskbar.volume}
				name='volum'
				onChange={handleChange}
			/>
		</div>
	);
}
