/** @format */

import { NextResponse } from "next/server";
import { read, write } from "sv/rw";
import { readdirSync } from "fs";
import path from "path";

export async function POST(request: any) {
	const { login_key } = await request.json();

	const data: string = readdirSync(process.env.INTERNAL_APPS);

	return NextResponse.json({
		apps: data.map((e: string) => {
			//
			const manifest: object = read(
				path.join(process.env.INTERNAL_APPS, `${e}/manifest.json`)
			);

			const appData: object = {
				name: e,
				iconPath: manifest.icon,
				iswindow: true,
				file: path.join(process.env.INTERNAL_APPS, `${e}/${manifest.app}`)
			};

			if (manifest.user === "all") {
				return appData;
			} else {
				//TODO validsrcion de usurio
				return appData;
			}
		})
	});
}
