/** @format */
"use client";

import { useEffect } from "react";
//
import TaskBar from "cp/task_bar";
import Screen from "cp/screen";
import Window from "cp/window";
import Lock from "cp/lock";
import Desktop from "cp/desktop";
import Volume from "cp/volume";
import Menu from "cp/menu";
import Info from "cp/info";
import LdDualRing from "cp/ld_dual_ring";
import PanelChecklock from "cp/panel_check_lock";
//
import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";
import { getDataStorage } from "hk/use_storage";
import { Post } from "hp/fetch";
import styles from "st/core.module.css";
import Middleware from "hp/middleware";

export default function Core({ storage }: { storage: object }) {
	const [state, dispatch] = useSuperState(
		Reducer,
		initialState(),
		["loading", "unblock"],
		Middleware
	);

	useEffect(() => {
		if (storage) {
			Post("token_check", {
				token: storage.login_key
			}).then(resp => {
				setTimeout(() => {
					dispatch({
						type: actions.loginKey,
						unblock: resp.unblock,
						loading: false
					});
				}, 1500);
			});
		}
	}, []);

	return (
		<div className={styles.core}>
			<Screen>
				{!state.unblock ? (
					<>
						<LdDualRing show={state.loading} />
						<Lock />
					</>
				) : (
					<>
						<TaskBar />
						<div className={styles.container_desk}>
							<div>
								<Desktop />
								<Menu />
								<Volume />
								<Info />
							</div>
							<PanelChecklock />
						</div>
					</>
				)}
			</Screen>
		</div>
	);
}
