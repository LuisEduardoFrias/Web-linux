/** @format */

"use client";
import React from "react";
import dynamic from "next/dynamic";
import LdDualRing from "./ld_dual_ring";
import Icon from "./icon";
import Wd, { WindowState } from "md/window";
import File from "md/file";
import Folder from "md/folder";
import FileFolder from "./file_folder";
import useSize from "hk/use_size";

import { getState, getDispatch } from "hk/use_all_state";
//import { actions } from "hp/reducer";
import styles from "st/window.module.css";

import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";

interface IWindowpProps {
	wd: Wd;
	deskW: number;
	deskH: number;
}

export default function Window({ wd, deskH, deskW }: IWindowpProps) {
	const [state, dispatch] = useSuperState(Reducer, initialState(), []);

	const size = useSize();
	//	const state = getState();

	wd.size.width = wd.state === WindowState.normal ? wd.size.width : deskW;
	wd.size.height = wd.state === WindowState.normal ? wd.size.height : deskH;
	wd.point.x = wd.state === WindowState.normal ? wd.point.x : 0;
	wd.point.y = wd.state === WindowState.normal ? wd.point.y : 0;

	/*	let DynamicComponet: any;
  	if (!wd.isFolder) {
  		DynamicComponet = dynamic(() => import(`../${wd.url}`), {
  			ssr: false,
  			loading: () => (
  				<LdDualRing
  					width={wd.size.w}
  					height={wd.size.h - 30}
  					x={wd.point.x + 1}
  					y={wd.point.y + 30}
  					show={true}
  				/>
  			)
  		});
  	}
*/
	function handleNormal() {
		if (wd.state == WindowState.maximum) {
			dispatch({
				type: actions.normalApp,
				window: {
					...wd,
					size: { w: 200, h: 100 },
					point: { x: 50, y: 59 },
					state: 1
				}
			});
		} else if (wd.state == WindowState.normal) {
			dispatch({
				type: actions.normalApp,
				window: {
					...wd,
					size: { w: deskW, h: deskH },
					point: { x: 0, y: 0 },
					state: 2
				}
			});
		}
	}

	const _style = {
		width: `${wd.size.w}px`,
		height: `${wd.size.h}px`,
		left: `${wd.point.x}px`,
		top: `${wd.point.y}px`
	};

	const fileFolders: (File | Foler)[] = [];

	if (wd.files) fileFolders.push(...wd.files);

	if (wd.folders) fileFolders.push(...wd.folders);

	// "./Rodeados.mp3"
	/*	const filedata = dynamic(
  		() => import(`../root/home/luiseduardofrias/pn.tsx`),
  		{
  			ssr: false,
  			loading: () => (
  				<LdDualRing
  					width={wd.size.w}
  					height={wd.size.h - 30}
  					x={wd.point.x + 1}
  					y={wd.point.y + 30}
  					show={true}
  				/>
  			)
  		}
  	);
*/

	return (
		<div className={styles.window} style={_style}>
			<div className={styles.bar}>
				<span>{wd.title}</span>
				<div className={styles.contro_size}>
					<Icon className={styles.icon}>close_fullscreen</Icon>
					<Icon className={styles.icon} onclick={handleNormal}>
						{wd.state == WindowState.maximum ? "fullscreen_exit" : "fullscreen"}
					</Icon>
					<Icon
						className={styles.icon}
						onclick={() => dispatch({ type: actions.closeApp, window: wd })}>
						close
					</Icon>
				</div>
			</div>
			<ul className={styles.menu}>
				<li>archivo</li>
				<li>editar</li>
				<li>ver</li>
				<li>ayuda</li>
			</ul>
			<div className={styles.container}>
				{/*
						!wd.isFolder ? (
						<DynamicComponet
							//data={{ path_video_audio: filedata }}
							width={wd.size.w}
							height={wd.size.h - 28}
						/>
					) : (
						<div className={styles.containerFile}>
							{fileFolders?.map((obj: File | Folder, inde: number) => (
								<FileFolder key={inde} obj={obj} url={wd.url} />
							))}
						</div>
					) */}
			</div>
		</div>
	);
}
