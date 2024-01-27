/** @format */

import os from "os";
import { read } from "sv/rw";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	const { login_key } = await request.json();

	const users: string = read(process.env.USERS_FILE);

	const user: object = Reflect.ownKeys(users).filter(
		(key: string) => users[key].token === login_key
	)[0];

	const username = users[user].userName;

	//const username = os.userInfo();
	const type = os.type();
	const totalmem = os.totalmem();
	const release = os.release();
	const platform = os.platform();
	const freemem = os.freemem();
	const cpus = os.cpus();
	const arch = os.arch();
	const machine = os.machine();

	return NextResponse.json({
		"user name": username,
		type,
		release,
		platform,
		"total memory": `${(totalmem / Math.pow(1024, 3)).toFixed(2)} GB`,
		"free memory": `${(freemem / Math.pow(1024, 3)).toFixed(2)} GB`,
		cpus,
		arch,
		machine
	});
}
