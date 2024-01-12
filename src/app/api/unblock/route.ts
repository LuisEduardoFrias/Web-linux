/** @format */

import { NextResponse } from "next/server";
import { Guid } from "guid-typescript";
import { read, write } from "sv/rw";

export async function POST(request: any) {
	const { user, password } = await request.json();

	const data: string = read(process.env.DATA_FILE);

	for (let i: number = 0; i < data.profiles.length; i++) {
		if (data.profiles[i].profile.user === user) {
			if (data.profiles[i].profile.password === password) {
				const token: string = Guid.create().toString();

				data.profiles[i].profile.token = token;

				write(process.env.DATA_FILE, data);

				return NextResponse.json({ unblock: true, token: token });
			}
		}
		return NextResponse.json({ unblock: false });
	}

	return NextResponse.json({ unblock: false });
}
