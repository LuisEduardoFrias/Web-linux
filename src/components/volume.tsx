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

	alert("volume");

	const _style = {
		width: "200px", //`${panelvolum.size.w}px`,
		height: "50px", //`${panelvolum.size.h}px`,
		right: "-30px", //`${panelvolum.point.x}px`,
		top: "0px", //`${panelvolum.point.y}px`,
		//display: taskbar.panel_volume ? "block" : "none",
		opacity: taskbar.panel_volume ? "1" : "0",
		transition: "opacity ease 1s"
	};

	function handleChange(event: any) {
		taskbar.changeVolume(event.target.value);
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
