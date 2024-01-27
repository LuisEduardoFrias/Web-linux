/** @format */

import { NextResponse, NextRequest } from "next/server";
import { openSync, writeFileSync, closeSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		const formData = await request.formData();
		const file = formData.get("file");
		const fileName = formData.get("fileName");
		const selectfile = formData.get("selectfile");
		const userName = formData.get("userName");

		const name = fileName.split("/").pop(); 
		const filePath = path.join("root", "home", userName, selectfile, name);

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		writeFile(filePath, buffer);

		return NextResponse.json({ data: "success" });
	} catch (error) {
		console.error("Error al guardar el archivo", error);
		return NextResponse.json({ data: "error" });
	}
}
