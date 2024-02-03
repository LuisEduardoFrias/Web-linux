/** @format */

"use client";

import { Guid } from "guid-typescript";
import Window from "md/window";
import Dk from "md/desk";
import Point from "md/point";
import Size from "md/size";

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
	openApp = "openApp",
	changeWindowState = "changeWindowState",
	closeApp = "closeApp",
	setFocus = "setFocus",
	minimized = "minimized"
	/*
	openFolder = "openFolder"*/
}

export default function Reducer(state, action) {
	const _actions = {
		unblock: () => {
			state.menu.apps = action.apps;
			return { ...state, unblock: action.unblock };
		},
		lock() {
			state.taskbar.panel_checklock = false;
			return { ...state, unblock: false };
		},
		loginKey: () => {
			state.menu.apps = action.apps;
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
		openApp: () => {
			const desktop: Dk = state.desks.filter(
				(desk: Dk) => desk.key === state.taskbar.desktop.key
			)[0];

			desktop.openWindows.push(
				new Window(
					action.app.name,
					action.app.file,
					action.app,
					new Point(0, 0),
					new Size(300, 200)
				)
			);

			state.taskbar.panel_menu = false;

			return { ...state };
		},
		minimized: () => {
			 state.dock.apps.push(action.app);
			return { ...state };
		},
		changeWindowState: () => {
			//const desk = state[state.bar.desktop];
			//desk.updateWindow(action.window);
			return { ...state };
		},
		closeApp: () => {
			const desktop: Dk = state.desks.filter(
				(desk: Dk) => desk.key === state.taskbar.desktop.key
			)[0];

			const index = desktop.openWindows.findIndex(
				w => w.key === action.window.key
			);

			if (index !== -1) {
				desktop.openWindows.splice(index, 1);
			}

			return { ...state };
		},
		setFocus: () => {
			/*const desk = state.desks.filter((desk: any) => desk.key === action.key);
			desk.windowFocus = action.value;*/
			return { ...state };
		},
		/*	
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
