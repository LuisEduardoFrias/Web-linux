/** @format */

import Point from "./point";
import Size from "./size";
import BaseObject from "./base_object";

export default class Panel extends BaseObject {
	constructor(point: Point, size: Size) {
		super(point, size);
	}
}
