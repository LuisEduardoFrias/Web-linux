/** @format */

import Point from "./point";
import Size from "./size";
import BaseObsject from "./base_object";
import AppMetaData from 'md/app_meta_data'

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
  app: AppMetaData;
  
	constructor(
		title: string,
		url: string,
		app: AppMetaData,
		point: Point,
		size: Size,
		fileFolders?: (File | Forder)[]
	) {
		super(point, size);
		this.title = title;
		this.url = url;
		this.app = app;
		this.state = WindowState.maximum;
		this.fileFolders = fileFolders;
	}
}
