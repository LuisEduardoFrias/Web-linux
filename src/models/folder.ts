/** @format */

import Point from "md/point";
import BaseObject from "md/base_object";

export default class Folder extends BaseObject {
	title: string;
  path: string;
  
	constructor(point: Point, title: string, path: string) {
		super(point);
		this.title = title;
		this.path = path;
	}
}
