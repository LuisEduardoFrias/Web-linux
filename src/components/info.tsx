/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { Get } from "hp/fetch";
import LdDualRing from "cp/ld_dual_ring";
import Icon from "cp/icon";
import styles from "st/info.module.css";
import { getState } from "hk/use_all_state";

export default function Info() {
	const { taskbar } = getState();
	const [info, setInfo] = useState(null);

	const _style: React.CSSProperties = {
		width: "150px", //`${panelvolum.size.w}px`,
		height: "150px", //`${panelvolum.size.h}px`,
		right: "10px", //`${panelvolum.point.x}px`,
		top: "2px", //`${panelvolum.point.y}px`,
		//display: taskbar.panel_volume ? "block" : "none",
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
						<div>
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
