/** @format */

import { NextResponse } from "next/server";
import { read } from "sv/rw";

export async function POST(request: any) {
	const { token } = await request.json();

	const users: string = read(process.env.USERS_FILE);
	const keys = Reflect.ownKeys(users);
	
	for (let i = 0; i < keys.length; i++) {
		if (users[keys[i]].token === token) {
			return NextResponse.json({ unblock: true });
		}
	}

	return NextResponse.json({ unblock: false });
}
