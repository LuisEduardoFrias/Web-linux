/** @format */

import { cd, ls, mkdir, move, rm } from "@/services/commands";
import Commander from "./commander";

export default function CommandDefined(command: string) {
	const program: Program = new Commander();

	program
		.command("cd")
		.argument("path")
		.action((obj: any) => {
			return cd(obj.path);
		});

	program
		.command("ls")
		.argument("path")
		.action((obj: any) => {
			return ls(obj.path);
		});

	program.command("mkdir").action((obj: any) => {});

	program.command("touch").action((obj: any) => {});

	program.command("echo").action((obj: any) => {});

	program.command("cat").action((obj: any) => {});

	program.command("cp").action((obj: any) => {});

	program.command("pt").action((obj: any) => {});

	program.command('pwd').action((obj: any) => {});

	program.command("rm").argument("path", true).option("-r").action(rm);

	program
		.command("mv")
		.argument("path1", true)
		.argument("path2", true)
		.option("-r")
		.action(move);

	return program.parse(command);
}
