import { NextResponse } from "next/server";
import CommandDefined from "@/services/command_defined";

export async function POST(request: any) {
	const { command } = await request.json();
	return NextResponse.json({ ...CommandDefined(command) });
}
