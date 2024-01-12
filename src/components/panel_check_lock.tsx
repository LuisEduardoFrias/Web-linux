/** @format */

"use client";
import LdDualRing from "cp/ld_dual_ring";
import CardNotification, { ModalType } from "cp/card_notification";
import { getState } from "hk/use_all_state";
import styles from "st/panel_check_lock.module.css";
import { useState } from "react";
import useSize from "hk/use_size";

export default function PanelChecklock() {
	const [isClose, setIsClose] = useState(false);
	const [isLoader, setIsLoader] = useState(true);
	const { taskbar } = getState();
	const size = useSize();

	function changeToLock() {
		setTimeout(() => {
			taskbar.lock();
			//setIsClose(false);
			setIsLoader(false);
		}, 3000);
	}

	const _styles: React.CSSProperties = {
		width: `${size.width}px`,
		height: `${size.height}px`
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
						taskbar.showLockCheckPanel();
					}}
				/>
			)}
		</div>
	);
}
