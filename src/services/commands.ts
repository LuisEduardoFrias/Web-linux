/** @format */

import {
	existsSync,
	mkdirSync,
	rmdirSync,
	renaneSync,
	lstatSync,
	readdirSync,
	unlinkSync
} from "fs";
import path from "path";
import { read, write } from "./rw";

const filepath: string = "./root/etc/users.json";

export function cd(_path: string): string {
	const homepath = "root/home/";
	let newpath: string = _path;

	if (_path === "" || !_path) newpath = homepath;

	const navegation = getPN();

	if (newpath === "..") {
		newpath = path.join(navegation.path, "../");
	} else if (newpath !== homepath) {
		newpath = path.join(navegation.path, newpath);
	}

	if (!existsSync(newpath))
		return { answer: `not exits path '${newpath}'.`, cmd: "cd" };

	if (navegation.path !== newpath) setPN(newpath);

	return {
		answer: newpath === homepath ? "" : newpath.replace(homepath, "/"),
		cmd: "cd"
	};
}

export function ls(_path?: string): object {
	if (_path === ".") return { answer: "restringido", cmd: "ls" };

	let newpath: string = "";
	const navegation = getPN();;

	if (_path !== "" && _path) {
		newpath = path.join(navegation.path, _path);
		if (/^\.\.\/|^\.\/|^\//.test(newpath))
			return { answer: "restringido", cmd: "ls" };
	} else {
		newpath = navegation.path;
	}

	if (existsSync(newpath)) {
		return { answer: readdirSync(newpath), cmd: "ls" };
	}
}

export function mkdir(_path: string): string {
	if (_path === "") return "";

	return { answer: mkdirSync(pathname), cmd: "mkdir" };
}

export function rm(_path: string, option?: string): string {
	const stats = lstatSync(_path);

	if (!stats.isDirectory()) {
		unlinkSync(_path);
		return { answer: "", cmd: "rm" };
	}

	if (option === "-r") {
		rmdirSync(_path, { recursive: true });
		return { answer: "", cmd: "rm" };
	} else {
		return "Debes proporcionar la opción -r para borrar este directorio";
	}
}

export function move(oldpath: string, newpath: string, option?: string) {
	existsSync(oldpath) && `El path ${oldpath} no existe.`;
	existsSync(newpath) && `El path ${newpath} no existe.`;

	const stats = lstatSync(oldpath);

	if (stats.isDirectory()) {
		if (oldpath !== newpath)
			if (option !== "-r")
				return "Debes proporcionar la opción -r para mover este directorio";
	}

	renameSync(oldpath, newpath);
	return { answer: "", cmd: "move" };
}

function getPN(): string {
	const objects = read(filepath);
	return objects["root"];
}

function setPN(newPath: string) {
	const objects = read(filepath);
	const _obj: object = objects["root"];
	_obj.path = newPath;
	write(filepath, { ...objects });
}
