/** @format */
import { Guid } from "guid-typescript";

export default class AppMetaData {
	keys: string;
	name: string;
	iconPath: string;
	iswindow: boolean;
	file: string;
	showOption: boolean;
	constructor(name: string, iconPath: string, iswindow: boolean, file: string) {
		this.keys = Guid.create().toString();
		this.name = name;
		this.iconPath = iconPath;
		this.iswindow = iswindow;
		this.file = file;
		this.showOption = false;
	}
}
