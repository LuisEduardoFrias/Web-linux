/** @format */

import { NextResponse, NextRequest } from "next/server";
import { read, write } from "sv/rw";

export async function POST(request: NextRequest) {
	const { name, userName, password } = await request.json();

	return NextResponse.status(200).json();
}
