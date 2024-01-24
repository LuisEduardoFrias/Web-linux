/** @format */

import { NextResponse, NextRequest } from "next/server";
import { read, write } from "sv/rw";
import CreateRootMap from "sv/create_rootmap";

export async function POST(request: NextRequest) {
	const { name, userName, password } = await request.json();

	const users: string = read(process.env.USERS_FILE);
	const shadow: string = read(process.env.SHADOW_FILE);

	Reflect.set(users, userName, {
		user: userName,
		password: "x",
		id: 0,
		gid: "0tf09e7g-0beb-3674-4bhe-bc85acl64d52",
		userName: name,
		path: `root/home/${userName}`,
		token: ""
	});

	//TODO Encripter passwd
	Reflect.set(shadow, userName, {
		user: userName,
		password: password,
		lastChange: 0,
		days: 15,
		daysChangePasswd: 30
	});

	CreateRootMap(userName);

	write(process.env.USERS_FILE, users);
	write(process.env.SHADOW_FILE, shadow);

	return NextResponse.json({ data: "success" });
}
