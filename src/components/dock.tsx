/** @format */

import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";
import styles from "st/dock.module.css";
import Image from "next/image";

export default function Dock() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), ["dock"]);

	const app = state.dock.apps;

	const _style: React.CSSProperties = {
		opacity: app.length === 0 ? "0" : "1",
		top: app.length === 0 && "10000px",
	};

	return (
		<div className={styles.dock} style={_style}>
			{app?.map((_app: string, index: number) => (
				<div
					className={styles.containerIcon}
					key={index}
					onClick={() => {
						alert("TODO");
						//	handleClick(_app);
					}}>
					<Image
						src={_app.iconPath}
						alt={_app.name}
						width={100}
						height={100}
						className={styles.img}
						priority
					/>
				</div>
			))}
		</div>
	);
}
