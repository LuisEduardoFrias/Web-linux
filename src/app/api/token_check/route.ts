/** @format */

import { NextResponse } from "next/server";
import { read } from "sv/rw";

export async function POST(request: any) {
	const { token } = await request.json();

	const users: string = read(process.env.USERS_FILE);

	Reflect.ownKeys(users).forEach((key: string) => {
		if (users[key].token === token) {
			return NextResponse.json({ unblock: true });
		}
	});

	return NextResponse.json({ unblock: false });
}
