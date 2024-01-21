/** @format */
import styles from "./files/user.module.css";

export default function User() {
	return (
		<div className={styles.containe}>
			<aside className={styles.aside}>
				<span>{"Users"}</span>
			</aside>
			<div className={styles.main}>
				<span>{"containee"}</span>
			</div>
		</div>
	);
}
