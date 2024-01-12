/** @format */

import Point from "./point";
import BaseObject from "./base_object";

export default class File extends BaseObject {
	title: string;
	icon: string | null;
	extention: string;

	constructor(
		point: Point,
		icon: string | null,
		title: string,
		extention: string
	) {
		super(point);
		this.title = title;
		this.icon = icon;
		this.extention = extention;
	}
}
