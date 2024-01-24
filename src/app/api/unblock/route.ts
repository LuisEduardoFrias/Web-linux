/** @format */

import { NextResponse } from "next/server";
import { Guid } from "guid-typescript";
import { read, write } from "sv/rw";

export async function POST(request: any) {
	const { user, password } = await request.json();

	const users: string = read(process.env.USERS_FILE);
	const shadow: string = read(process.env.SHADOW_FILE);

	//TODO validate password desencripter
	if (shadow[user]?.password === password) {
		const token: string = Guid.create().toString();
		users[user].token = token;

		write(process.env.USERS_FILE, users);

		return NextResponse.json({ unblock: true, token });
	}

	return NextResponse.json({ unblock: false });
}
