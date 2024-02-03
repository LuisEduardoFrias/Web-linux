/** @format */

"use client";
import Icon from "cp/icon";
import Image from "next/image";
import Mn from "md/menu";
import { useState, useRef } from "react";
import AppMetaData from "md/app_meta_data";

import styles from "st/menu.module.css";
import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";

interface showOption {
	show: boolean;
	app: AppMetaData;
}

interface App {
	name: string;
	img: string;
}

export default function Menu() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"taskbar",
		"menu"
	]);

	const [presionado, setPresionado] = useState(false);
	let timeoutId;

	const { menu, taskbar } = state;

	const [apps, setApps] = useState<AppMetaData[]>([...menu.apps]);

	const half: number = Math.ceil(apps?.length / 2);

	const firstHalf: AppMetaData[] = apps?.slice(0, half);
	const secondHalf: AppMetaData[] = apps?.slice(half);

	const _style = {
		top: taskbar.panel_menu ? "0px" : "-10000px",
		opacity: taskbar.panel_menu ? "1" : "0"
	};

	function handleClick(_app: AppMetaData): void {
		dispatch({ type: actions.openApp, app: _app });
	}

	function handleMouseDown(app: AppMetaData) {
		timeoutId = setTimeout(() => {
			setApps((prev: AppMetaData[]) => {
				const index: number = prev.findIndex(
					(ap: AppMetaData) => ap.key === app.key
				);
				if (index !== -1) {
					prev.forEach((pr: AppMetaData) => (pr.showOption = false));
					prev[index].showOption = true;
				}
				return [...prev];
			});
		}, 900);
	}

	function handleMouseUp(app: AppMetaData) {
		clearTimeout(timeoutId);
		/*	
		setApps((prev: AppMetaData[]) => {
			const index: number = prev.findIndex(
				(ap: AppMetaData) => ap.key === app.key
			);

			if (index !== -1) {
				prev[index].showOption = false;
			}
			return [...prev];
		});
		*/
	}

	function handleOption(value: string) {
		alert(value);
	}

	function Row({ half }: AppMetaData[]): JSX.Element {
		return (
			<div className={styles.row}>
				{half?.map((_app: AppMetaData, i: number) => (
					<div key={i} className={styles.app}>
						{_app.showOption && (
							<div className={styles.options}>
								<ul className={styles.ul}>
									<li
										className={styles.li}
										onClick={() => handleOption("unistall")}>
										uninstall
									</li>
									<li
										className={styles.li}
										onClick={() => handleOption("add_dock")}>
										add dock
									</li>
								</ul>
							</div>
						)}
						<button
							className={styles.facade}
							onClick={(e: any) => {
								handleClick(_app);
							}}
							onTouchStart={(e: any) => {
								handleMouseDown(_app);
							}}
							onTouchEnd={(e: any) => {
								handleMouseUp(_app);
							}}
							onMouseDown={(e: any) => {
								handleMouseDown(_app);
							}}
							onMouseUp={(e: any) => {
								handleMouseUp(_app);
							}}></button>
						<Image
							src={_app.iconPath}
							alt={_app.name}
							width={100}
							height={100}
							className={styles.img}
							priority
						/>
						<span style={{ userSelect: "none" }}>{_app.name}</span>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className={styles.container_screen} style={_style}>
			<div
				className={styles.screen}
				onClick={() => {
					setApps((prev: AppMetaData[]) => {
						prev.forEach((pr: AppMetaData) => (pr.showOption = false));
						return [...prev];
					});
				}}>
				<Row half={firstHalf} />
				<Row half={secondHalf} />
			</div>
		</div>
	);
}
