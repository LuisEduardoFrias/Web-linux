/** @format */

"use client";
import Icon from "cp/icon";
import Image from "next/image";
import Mn from "md/menu";
import { useState } from "react";

import styles from "st/menu.module.css";
import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";

interface App {
	name: string;
	img: string;
}

export default function Menu() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"taskbar",
		"menu"
	]);

	const { menu, taskbar } = state;

	const half: number = Math.ceil(menu.apps?.length / 2);

	const firstHalf: AppMetaData[] = menu.apps?.slice(0, half);
	const secondHalf: AppMetaData[] = menu.apps?.slice(half);

	const _style = {
		top: taskbar.panel_menu ? "0px" : "-10000px",
		opacity: taskbar.panel_menu ? "1" : "0"
	};

	function handleClick(_app: AppMetaData): void {
		dispatch({ type: actions.openApp, app: _app });
	}

	function Row({ half }: AppMetaData[]): JSX.Element {
		return (
			<div className={styles.row}>
				{half?.map((_app: AppMetaData, i: number) => (
					<div
						key={i}
						className={styles.app}
						onClick={() => {
							handleClick(_app);
						}}>
						<Image
							src={_app.iconPath}
							alt={_app.name}
							width={100}
							height={100}
							className={styles.img}
							priority
						/>
						<span>{_app.name}</span>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className={styles.container_screen} style={_style}>
			<div className={styles.screen}>
				<Row half={firstHalf} />
				<Row half={secondHalf} />
			</div>
		</div>
	);
}
