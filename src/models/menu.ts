/** @format */

import AppMetaData from "md/app_meta_data";

export default class Menu {
	apps: AppMetaData[];

	constructor(apps: AppMetaData[]) {
		this.apps = apps;
	}
}
