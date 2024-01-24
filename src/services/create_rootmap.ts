/** @format */

import fs from "fs";

export default function CreateRootMap(user: string) {
	const rootPath = "./root";

	if (fs.existsSync(`${rootPath}/home/${user}`)) {
		return;
	}

	const files = [
		rootPath,
		`${rootPath}/home/${user}/downloads`,
		`${rootPath}/home/${user}/documents`,
		`${rootPath}/home/${user}/images`,
		`${rootPath}/home/${user}/videos`,
		`${rootPath}/home/${user}/audios`
	];
	try {
		files.forEach(file => {
			fs.mkdirSync(file, { recursive: true });
		});
	} catch (error) {
		console.error("Create_rootmap: ", error);
	}
}
