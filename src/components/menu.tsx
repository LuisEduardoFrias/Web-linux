/** @format */

"use client";
import Icon from "cp/icon";
import Image from "next/image";
import Mn from "md/menu";
import { useState } from "react";
//import { actions } from "hp/reducer";
import { Dispatch, getState } from "hk/use_all_state";
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
	alert("menu");
	const half: number = Math.ceil(menu?.app.length / 2);
	const firstHalf: AppMetaData[] = menu?.app.slice(0, half);
	const secondHalf: AppMetaData[] = menu?.app.slice(half);

	const _style = {
		transition: "opacity ease 1s",
		//	display: taskbar.panel_menu ? "block" : "none",
		opacity: taskbar.panel_menu ? "1" : "0"
	};

	function handleClick(_app: AppMetaData): void {
		//	Dispatch({ type: actions.openApp, app: _app });
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
							src={_app.img}
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
