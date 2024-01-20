/** @format */

import Icon from "cp/icon";
import styles from "st/logo.module.css";

export default function Logo() {
	return (
		<div className={styles.container}>
			<Icon className={styles.pets}>pets</Icon>
			<Icon className={styles.bug}>bug_report</Icon>
		</div>
	);
}
