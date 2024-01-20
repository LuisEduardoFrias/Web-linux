/** @format */

"use client";

import { Guid } from "guid-typescript";
import Window from "md/window";

export type Action = {
	type: action;
	value: any;
};

export enum actions {
	unblock = "unblock",
	loginKey = "loginKey",
	showPanelMenu = "showPanelMenu",
	showVolumePanel = "showVolumePanel",
	changeDesktop = "changeDesktop",
	changeVolume = "changeVolume",
	showLockCheckPanel = "showLockCheckPanel",
	lock = "lock",
	showInfoPanel = "showInfoPanel",
	openApp = "openApp"
	/*
	closeApp = "closeApp",
	normalApp = "normalApp",
	openFolder = "openFolder"*/
}

export default function Reducer(state, action) {
	const _state = { ...state };
	const _actions = {
		unblock: () => {
			_state.menu.apps = action.apps;
			return { ..._state, unblock: action.unblock };
		},
		lock() {
			_state.taskbar.panel_checklock = false;
			return { ..._state, unblock: false };
		},
		loginKey: () => {
			_state.menu.apps = action.apps;
			return { ..._state, unblock: action.unblock, loading: action.loading };
		},
		showPanelMenu: () => {
			desTaskBarProp(_state, ["panel_menu"], action.value);
			return { ..._state };
		},
		showVolumePanel: () => {
			desTaskBarProp(_state, ["panel_volume"], action.value);
			return { ..._state };
		},
		changeDesktop: () => {
			_state.taskbar.desktop = action.value;
			if (_state.taskbar.panel_volume)
				_state.taskbar.panel_volume = !action.value;
			return { ..._state };
		},
		changeVolume: () => {
			_state.taskbar.volume = action.value;
			return { ..._state };
		},
		showLockCheckPanel: () => {
			desTaskBarProp(_state, ["panel_checklock"], action.value);
			return { ..._state };
		},
		showInfoPanel: () => {
			desTaskBarProp(_state, ["panel_info"], action.value);
			return { ..._state };
		},
		openApp: () => {
			_state.desks[_state.taskbar.desktop].addWindow(action.app.name);
			_state.taskbar.panel_menu = false;

			return { ..._state };
		},
		/*	
		openFolder: () => {
			const desk = _state[_state.bar.desktop];

			desk.addWindow(
				new Wd(Guid.create().toString(), "Folder", null),
				_state.initDt.size.w,
				_state.initDt.size.y - _state.bar.h
			);

			if (_state.bar.showPanelVolum) _state.bar.showVolum(false);
			if (_state.bar.showPanelMenu) _state.bar.showMenu(false);

			return { ..._state };
		},
		closeApp: () => {
			const desk = _state[_state.bar.desktop];
			desk.removeWindow(action.window);
			return { ..._state };
		},
		normalApp: () => {
			const desk = _state[_state.bar.desktop];
			desk.updateWindow(action.window);
			return { ..._state };
		},
		*/
		default: () => {
			throw Error("Unknown action: " + action.type);
		}
	};

	return (_actions[action.type] || _actions["default"])();
}

function desTaskBarProp(
	state: any,
	activateProp: string,
	value: boolean
): void {
	state.taskbar.panel_info = false;
	state.taskbar.panel_volume = false;
	state.taskbar.panel_menu = false;

	state.taskbar[activateProp] = value;
}
