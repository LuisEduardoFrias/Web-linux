/** @format */

import { read } from "sv/rw";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const users: string = read(process.env.USERS_FILE);

	return NextResponse.json({
		data: Reflect.ownKeys(users).map((key: string) => users[key])
	});
}
