/** @format */

import { NextResponse } from "next/server";
import CommandDefined from "sv/command_defined";

export async function POST(request: any) {
	const { command } = await request.json();
	
	console.log(CommandDefined(command))
	return NextResponse.json({ ...CommandDefined(command) });
}
