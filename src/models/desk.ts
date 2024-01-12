/** @format */
import { Guid } from "guid-typescript";

import Folder from "./folder";
import File from "./file";
import Point from "./point";
import Window from "./window";

export default class Desk {
	key: string;
	fileFolders: (File | Forder)[];
	openWindows: Window[];
	name: string;

	constructor(fileFolders: (File | Forder)[], desktop: string) {
		this.key = Guid.create().toString();
		this.fileFolders = fileFolders;
		this.name = desktop;
		this.openWindows = [];
	}
}
