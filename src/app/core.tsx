/** @format */
"use client";

import Draggable from "react-draggable";
import { useEffect } from "react";
//
import TaskBar from "cp/task_bar";
import Screen from "cp/screen";
import Window from "cp/window";
import Lock from "cp/lock";
import Volume from "cp/volume";
import Menu from "cp/menu";
import Info from "cp/info";
import LdDualRing from "cp/ld_dual_ring";
import PanelChecklock from "cp/panel_check_lock";
//
import { Get } from "hp/fetch";
import useAllState from "hk/use_all_state";
import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";
import styles from "st/core.module.css";
import { getDataStorage } from "hk/use_storage";
import { Post } from "hp/fetch";

export default function Core() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"loading",
		"unblock"
	]);

	const _state = useAllState();

	alert("core");

	useEffect(() => {
		//alert("core: " + JSON.stringify());

		const storage = getDataStorage(process.env.NEXT_PUBLIC_.LOGIN_KEY);

		Post("token_check", {
			token: storage.login_key
		}).then(resp => {
			setTimeout(() => {
				alert("dispatch: " + resp.unblock);
				dispatch({
					type: actions.loginKey,
					unblock: !resp.unblock,
					loading: false
				});
			}, 1500);
		});
	}, []);

	/*	useEffect(() => {
	  	//alert("core: " + JSON.stringify());
	  	//alert("core: ");
	}, [state.unblock, state.loading]);
*/
	/*	useEffect(() => {
  		(async () => {
  			const listApp = await Get("internal_apps");
  		})();
  	}, []);
*/
	return (
		<div className={styles.core}>
			{
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

									{/*
									state.desks.map((desk_: Dk, index: number) => {
									if (desk_.key === talkback.desktop.key)
										return (
											<div key={index} className={styles.desk}>
												{/* desk_.fileFolders.map((obj: File | Folder, inde: number) => <FileFolder key={inde} obj={obj} /> 
            ) }
												{ 
												desk_.openWindows?.map((w, i) => (
													<Window key={i} wd={w} deskW={500} deskH={400} />
												)) 
												}
											</div>
										);
								}) */}
									{/*state.taskbar.panel_menu true && <Menu /> */}
									{/*state.taskbar.panel_volume*/ true && <Volume />}
									{/*state.taskbar.panel_info*/ true && <Info />}
								</div>
								{/* state.taskbar.panel_checklock && <PanelChecklock /> */}
							</div>
						</>
					)}
				</Screen>
			}
		</div>
	);
}
