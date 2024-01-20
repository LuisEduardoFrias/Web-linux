/** @format */

import Point from "./point";
import Size from "./size";
import BaseObsject from "./base_object";

export enum WindowState {
	minimized,
	normal,
	maximum
}

export default class Window extends BaseObsject {
	title: string;
	url: string;
	state: State;
	fileFolders: (File | Forder)[] | undefined;

	constructor(
		title: string,
		url: string,
		point: Point,
		size: Size,
		fileFolders?: (File | Forder)[]
	) {
		super(point, size);
		this.title = title;
		this.url = url;
		this.state = WindowState.maximum;
		this.fileFolders = fileFolders;
	}
}
