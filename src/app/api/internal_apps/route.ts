/** @format */
import path from "path";
import { readdirSync } from "fs";

import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const apps: string[] = readdirSync(process.env.INTERNAL_APPS);
	console.log(apps);
	return NextResponse.json(apps);
}
