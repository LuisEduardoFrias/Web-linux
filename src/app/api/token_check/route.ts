/** @format */

import { NextResponse } from "next/server";
import { read } from "sv/rw";

export async function POST(request: any) {
	const { token } = await request.json();

	const data: string = read(process.env.DATA_FILE);

	for (let i: number = 0; i < data.profiles.length; i++) {
		if (data.profiles[i].profile.token === token) {
			return NextResponse.json({ unblock: true });
		}
	}
	return NextResponse.json({ unblock: false });
}
