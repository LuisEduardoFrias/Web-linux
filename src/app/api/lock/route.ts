/** @format */

import { NextResponse, NextRequest } from "next/server";
import { read, write } from "sv/rw";

export async function POST(request: NextRequest) {
	const { login_key } = await request.json();

	const data: string = read(process.env.DATA_FILE);

	for (let i: number = 0; i < data.profiles.length; i++) {
		if (data.profiles[i].profile.token === login_key) {
			data.profiles[i].profile.token = "";
			write(process.env.DATA_FILE, data);
			return NextResponse.status(200).json();
		}
	}

	return NextResponse.status(404).json();
}
