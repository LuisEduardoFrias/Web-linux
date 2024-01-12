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
	showInfoPanel = "showInfoPanel"
	/*
	openApp = "openApp",
	closeApp = "closeApp",
	normalApp = "normalApp",
	openFolder = "openFolder"*/
}

export default function Reducer(state, action) {
	const _actions = {
		unblock: () => {
			return { ...state, unblock: action.unblock };
		},
		lock() {
			state.taskbar.panel_checklock = false;
			return { ...state, unblock: false };
		},
		loginKey: () => {
			return { ...state, unblock: action.unblock, loading: action.loading };
		},
		showPanelMenu: () => {
			desTaskBarProp(state, ["panel_menu"], action.value);
			return { ...state };
		},
		showVolumePanel: () => {
			desTaskBarProp(state, ["panel_volume"], action.value);
			return { ...state };
		},
		changeDesktop: () => {
			state.taskbar.desktop = action.value;
			if (state.taskbar.panel_volume)
				state.taskbar.panel_volume = !action.value;
			return { ...state };
		},
		changeVolume: () => {
			state.taskbar.volume = action.value;
			return { ...state };
		},
		showLockCheckPanel: () => {
			desTaskBarProp(state, ["panel_checklock"], action.value);
			return { ...state };
		},
		showInfoPanel: () => {
			desTaskBarProp(state, ["panel_info"], action.value);
			return { ...state };
		},
		/*	
		openApp: () => {
			const desk = state[state.bar.desktop];

			desk.addWindow(
				new Wa(Guid.create().toString(), action.app.name, action.app.file),
				state.initDt.size.w,
				state.initDt.size.y - state.bar.h
			);

			if (state.bar.showPanelMenu) state.bar.showMenu(false);

			return { ...state };
		},
		openFolder: () => {
			const desk = state[state.bar.desktop];

			desk.addWindow(
				new Wd(Guid.create().toString(), "Folder", null),
				state.initDt.size.w,
				state.initDt.size.y - state.bar.h
			);

			if (state.bar.showPanelVolum) state.bar.showVolum(false);
			if (state.bar.showPanelMenu) state.bar.showMenu(false);

			return { ...state };
		},
		closeApp: () => {
			const desk = state[state.bar.desktop];
			desk.removeWindow(action.window);
			return { ...state };
		},
		normalApp: () => {
			const desk = state[state.bar.desktop];
			desk.updateWindow(action.window);
			return { ...state };
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
