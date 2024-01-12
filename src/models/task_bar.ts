/** @format */

import BaseObject from "./base_object";
import Size from "./size";
import Point from "./point";
import Desk from "./desk";
//
import { actions } from "hp/reducer";
import { Dispatch } from "hk/use_all_state";

export enum Position {
	top,
	rigth,
	bottom,
	left
}

export default class TaskBar extends BaseObject {
	position: Position;
	desktop: Desk;
	volume: number;
	panel_menu: boolean;
	panel_volume: boolean;
	panel_checklock: boolean;
  panel_info: boolean;
  
	constructor(height: number, desktop: Desk, point: Point, volum: number) {
		super(point);
		this.size = new Size(0, height);
		this.desktop = desktop;
		this.position = Position.top;
		this.volume = volum;
		this.panel_menu = false;
		this.panel_volume = false;
		this.panel_checklock = false;
		this.panel_info = false;
		
	}

	changeVolume(value: number) {
		Dispatch({ type: actions.changeVolume, value: value });
	}

	changeDesktop(desktop: Desk) {
		Dispatch({ type: actions.changeDesktop, value: desktop });
	}

	showPanelMenu() {
		Dispatch({ type: actions.showPanelMenu, value: !this.panel_menu });
	}

	showVolumePanel() {
		Dispatch({ type: actions.showVolumePanel, value: !this.panel_volume });
	}
	showLockCheckPanel() {
		Dispatch({
			type: actions.showLockCheckPanel,
			value: !this.panel_checklock
		});
	}
	showInfoPanel() {
		Dispatch({
			type: actions.showInfoPanel,
			value: !this.panel_info
		});
	}
	lock() {
		Dispatch({ type: actions.lock, islock: true });
	}
}
