/** @format */
import { Guid } from "guid-typescript";

import Folder from "md/folder";
import AppMetaData from "md/app_meta_data";
import File from "md/file";
import Point from "md/point";
import Size from "md/size";
import Window from "md/window";

export default class Desk {
	key: string;
	fileFolders: (File | Forder)[];
	openWindows: Window[];
	windowFocus: string;
	name: string;

	constructor(fileFolders: (File | Forder)[], desktop: string) {
		this.key = Guid.create().toString();
		this.fileFolders = fileFolders;
		this.name = desktop;
		this.openWindows = [];
		this.windowFocus = "";
	}

	addWindow(app: AppMetaData) {
		this.openWindows.push(
			new Window(app.name, app.file, new Point(0, 0), new Size(300, 200))
		);
	}
}
