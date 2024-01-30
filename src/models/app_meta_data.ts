/** @format */
import { Guid } from "guid-typescript";

export default class AppMetaData {
	key: string;
	name: string;
	iconPath: string;
	iswindow: boolean;
	file: string;
	showOption: boolean;
	constructor(name: string, iconPath: string, iswindow: boolean, file: string) {
		this.key = Guid.create().toString();
		this.name = name;
		this.iconPath = iconPath;
		this.iswindow = iswindow;
		this.file = file;
		this.showOption = false;
	}
}
