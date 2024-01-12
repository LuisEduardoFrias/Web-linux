/** @format */

"use client";
import Icon from "cp/icon";
import { getState } from "hk/use_all_state";
import styles from "st/home_button.module.css";

export default function HomeButton() {
	const { taskbar } = getState();
	return (
		<>
			<div
				className={styles.home}
				onClick={() => {
					taskbar.showPanelMenu();
				}}>
				<Icon className={styles.pets}>pets</Icon>
				<Icon className={styles.bug}>bug_report</Icon>
			</div>
		</>
	);
}
