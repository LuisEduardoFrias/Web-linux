/** @format */

export default class AppMetaData {
	name: string;
	iconPath: string;
	iswindow: boolean;
	file: string;
	constructor(name: string, iconPath: string, iswindow: boolean, file: string) {
		this.name = name;
		this.iconPath = iconPath;
		this.iswindow = iswindow;
		this.file = file;
	}
}
