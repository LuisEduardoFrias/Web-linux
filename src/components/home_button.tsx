/** @format */

"use client";
import Icon from "cp/icon";
import { getState } from "hk/use_all_state";
import styles from "st/home_button.module.css";
import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";

export default function HomeButton() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), ["taskbar"]);

	const { taskbar } = state;
	return (
		<>
			<div
				className={styles.home}
				onClick={() => {
					dispatch({ type: actions.showPanelMenu, value: !taskbar.panel_menu });
				}}>
				<Icon className={styles.pets}>pets</Icon>
				<Icon className={styles.bug}>bug_report</Icon>
			</div>
		</>
	);
}
