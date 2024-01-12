/** @format */

import Point from "./point";
import BaseObject from "./base_object";

export default class Folder extends BaseObject {
	title: string;
  path: string;
  
	constructor(point: Point, title: string, path: string) {
		super(point);
		this.title = title;
		this.path = path;
	}
}
