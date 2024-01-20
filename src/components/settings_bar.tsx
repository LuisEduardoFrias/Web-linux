/** @format */

import { getState, Dispatch } from "hk/use_all_state";
import Icon from "cp/icon";
import DateTime from "cp/datetime";
import useSize from "hk/use_size";
import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";

export default function SettingsBar() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), ["taskbar"]);

	const { taskbar } = state;
	const { width } = useSize();

	let iconVolume: string = "";

	if (taskbar.volume >= 74) {
		iconVolume = "brand_awareness";
	} else if (taskbar.volume >= 45 && taskbar.volume < 74) {
		iconVolume = "volume_up";
	} else if (taskbar.volume > 9 && taskbar.volume < 45) {
		iconVolume = "volume_down";
	} else {
		iconVolume = "volume_off";
	}

	return (
		<>
			{width > 480 && <DateTime />}
			<Icon
				onclick={() =>
					dispatch({
						type: actions.showInfoPanel,
						value: !taskbar.panel_info
					})
				}>
				info
			</Icon>
			<Icon
				onclick={() =>
					dispatch({
						type: actions.showVolumePanel,
						value: !taskbar.panel_volume
					})
				}>
				{iconVolume}
			</Icon>
			<div className='divider'></div>
			<Icon
				onclick={() =>
					dispatch({
						type: actions.showLockCheckPanel,
						value: !taskbar.panel_checklock
					})
				}>
				lock
			</Icon>
			{/*	<Icon>power_settings_new</Icon> */}
		</>
	);
}
