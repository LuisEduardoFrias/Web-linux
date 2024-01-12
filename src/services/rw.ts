import { openSync, closeSync, writeFileSync, readFileSync } from "fs";
//
// read
//
export function read(path: string): object {
	try {
		return JSON.parse(readFileSync(path));
	} catch (err: any) {
		throw new TypeError("RW: " + err);
	}
}
//
// write
//
export function write(path: string, obj: object) {
	let fd;

	try {
		fd = openSync(path, "w");
		writeFileSync(fd, JSON.stringify(obj), "utf8");
	} catch (err) {
		throw new TypeError("RW: " + err);
	} finally {
		if (fd !== undefined) closeSync(fd);
	}
}
