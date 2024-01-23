/** @format */

import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	
	return NextResponse.json({
    data: "user", groups:"users groups"
	});
}
