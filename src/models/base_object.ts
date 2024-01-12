/** @format */
import { Guid } from "guid-typescript";

import Point from "./point";
import Size from "./size";

export default class BaseObject {
	key: string;
	point: Point;
	size: Size;

	constructor(point?: Point, size?: Size) {
		this.key = Guid.create().toString();
		this.point = point ?? new Point(0, 0);
		this.size = size ?? new Size(10, 10);
	}
}
