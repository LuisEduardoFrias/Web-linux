/** @format */

"use client";
import LdDualRing from "cp/ld_dual_ring";
import CardNotification, { ModalType } from "cp/card_notification";

import styles from "st/panel_check_lock.module.css";
import { useState } from "react";
import useSize from "hk/use_size";
import { getDataStorage } from "hk/use_storage";

import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";
import Middleware from "hp/middleware";

export default function PanelChecklock() {
	const [isClose, setIsClose] = useState(false);
	const [isLoader, setIsLoader] = useState(true);
	const data = getDataStorage(process.env.NEXT_PUBLIC_.LOGIN_KEY);

	const [state, dispatch] = useSuperState(
		Reducer,
		initialState(),
		["taskbar"],
		Middleware
	);

	const { taskbar } = state;
	const size = useSize();

	function changeToLock() {
		setTimeout(() => {
		if(data?.login_key)
			dispatch({
				type: actions.lock,
				login_key: data.login_key,
				islock: true,
				hiddenLoader: () => setIsLoader(false)
			});

			//setIsClose(false);
		}, 3000);
	}

	const _styles: React.CSSProperties = {
		width: `${size.width}px`,
		height: `${size.height}px`,
		transition: "opacity 1s ease",
		position: "absolute",
		top: `${taskbar.panel_checklock ? "0px" : "-10000px"}`,
		opacity: `${taskbar.panel_checklock ? "1" : "0"}`
	};

	return (
		<div style={_styles}>
			{isClose ? (
				<>
					<LdDualRing show={isLoader} />
					{changeToLock()}
				</>
			) : (
				<CardNotification
					show={true}
					type={ModalType.warning}
					title={"Check logout"}
					dialog={"Surely you want to block the section?"}
					onClick1={(event: any) => {
						setIsClose(true);
					}}
					onClick2={(event: any) => {
						dispatch({
							type: actions.showLockCheckPanel,
							value: !taskbar.panel_checklock
						});
					}}
				/>
			)}
		</div>
	);
}
