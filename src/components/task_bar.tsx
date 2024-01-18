/** @format */

"use client";

import Icon from "cp/icon";
import HomeButton from "cp/home_button";
import Desktops from "cp/desktops";
import SettingsBar from "cp/settings_bar";
//
import Br from "md/task_bar";
//import { actions } from "hp/reducer";
import { getState } from "hk/use_all_state";
import styles from "st/tackback.module.css";
import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";

export default function TaskBar() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), ["taskbar"]);

	const { taskbar } = state;

	const _style = {
		height: `${taskbar.size.height}px`
	};

	function click(): void {
		props.dispatch({ type: actions.openFolder });
	}

	return (
		<div className={styles.bar} style={_style}>
			<div className={styles.left_site} style={_style}>
				<HomeButton />

				<div className='divider'></div>

				<div className={styles.container_app}>
					<Icon>description</Icon>
					<Icon>folder</Icon>
					<Icon>travel_explore</Icon>
					<Icon>joystick</Icon>
					<Icon>terminal</Icon>
				</div>

				<div className='divider'></div>

				<div className={styles.container_windows}>
					<Desktops />
				</div>

				<div className='divider'></div>
			</div>
			<div className={styles.settings}>
				<SettingsBar />
			</div>
		</div>
	);
}
