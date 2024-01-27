/** @format */

import { NextResponse, NextRequest } from "next/server";
import { read, write } from "sv/rw";

export async function POST(request: NextRequest) {
	const { login_key } = await request.json();

	const users: string = read(process.env.USERS_FILE);

	Reflect.ownKeys(users).forEach((key: string) => {
		if (users[key].token === login_key) {
			users[key].token = "";
			write(process.env.USERS_FILE, users);
			return NextResponse.status(200).json();
		}
	});

	return NextResponse.status(404).json();
}
