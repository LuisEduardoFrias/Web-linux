/** @format */

import Tb, { Position } from "md/task_bar";
import Dk from "md/desk";
import File from "md/file";
import Dock from "md/dock";
import Folder from "md/folder";
import AppMetaData from "md/app_meta_data";
import Menu from "md/menu";
import Point from "md/point";
import Size from "md/size";
import Wd from "md/window";

export default function initialState() {
	//
	const TbPoint: Point = new Point(0, 0);
	const DkFile = new File(new Point(10, 10), null, "app", "txt");
	const desk1: Dk = new Dk([DkFile], "screen1");
	const desk2: Dk = new Dk([], "screen2");
	const desk3: Dk = new Dk([], "screen3");
	const desk4: Dk = new Dk([], "screen4");

	//desk1.addWindow({ name: "jemplo", iconPath: "string", iswindow: true });

	const apps: AppMetaData[] = [];
	const dock: Dock = new Dock(apps);
	const menu = new Menu(apps);

	//const panelPoint:Point = new Point(-30, 0);
	//const panelSize:Size = new Size(200,50);
	//const menuPoint:Point = new Point(0, 0);
	//const menuSize:Size = new Size(0,0);
	//const mousePoint:Point = new Point(210,160);

	return {
		desks: [desk1, desk2, desk3, desk4],
		taskbar: new Tb(30, desk1, TbPoint, 80),
		unblock: false,
		loading: false,
		menu,
		dock,
		/*initDt: new Dt(500, 250),
  confLock: new Lk(),
  confPanel: new Panel(panelPoint, panelSize),
  confMenu: new Mn(menuPoint, menuSize, setting.apps),
  showChecklock: false,*/
	};
}
