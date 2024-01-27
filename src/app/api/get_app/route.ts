/** @format */

import { NextResponse } from "next/server";
import { read, write } from "sv/rw";
import { readdirSync } from "fs";
import path from "path";

export async function POST(request: any) {
	const { login_key } = await request.json();

	const data: string = readdirSync(process.env.INTERNAL_APPS);

	const users: object = read(process.env.USERS_FILE);

	const user: object = Reflect.ownKeys(users).filter(
		(key: string) => users[key].token === login_key
	)[0];

	return NextResponse.json({
		apps: data
			.map((e: string) => {
				//
				const manifest: object = read(
					path.join(process.env.INTERNAL_APPS, `${e}/manifest.json`)
				);

				const appData: object = {
					name: e,
					iconPath: manifest.icon,
					iswindow: true,
					file: path.join(e, manifest.app)
				};

				if (manifest.user === "all") {
					return appData;
				} else if (manifest.user === users[user].userName) {
					return appData;
				}
			})
			.filter((e: object) => e !== undefined)
	});
}
