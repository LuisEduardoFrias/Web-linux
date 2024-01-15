/** @format */

"use client";
import Icon from "cp/icon";
import styles from "st/volume.module.css";
import { superState } from "hk/use_all_state";

export default function Volume() {
	const [taskbar, setState] = superState("taskbar", "Volume");
	
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
