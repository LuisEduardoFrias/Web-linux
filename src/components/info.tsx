/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { Get } from "hp/fetch";
import LdDualRing from "cp/ld_dual_ring";
import Icon from "cp/icon";
import styles from "st/info.module.css";
import { getState } from "hk/use_all_state";
import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";

export default function Info() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), ["taskbar"]);

	const [info, setInfo] = useState(null);
	const { taskbar } = state;

	const _style: React.CSSProperties = {
		width: "150px",
		height: "150px",
		right: "10px",
		top: `${taskbar.panel_info ? "4px" : "-400px"}`,
		opacity: taskbar.panel_info ? "1" : "0"
	};

	useEffect(() => {
		(async () => {
			setInfo(await Get("info"));
		})();
	}, []);

	return (
		<div className={styles.container} style={_style}>
			{info ? (
				<div className={styles.content}>
					{Reflect.ownKeys(info).map((key, index) => (
						<div key={index}>
							<span>{firtsUpperCase(key)}</span>:<span> {info[key]}</span>
						</div>
					))}
				</div>
			) : (
				<LdDualRing show={true} width={10} height={10} />
			)}
		</div>
	);
}

function firtsUpperCase(key: string): string {
	return `${key.substring(0, 1).toUpperCase()}${key.substring(1, key.length)}`;
}
