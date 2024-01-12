/** @format */

import { NextResponse, NextRequest } from "next/server";
import os from "os";

export async function GET(request: NextRequest) {
	const { username } = os.userInfo();
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
