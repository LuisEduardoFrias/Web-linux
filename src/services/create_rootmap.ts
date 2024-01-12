import fs from "fs";

export default function CreateRootMap() {
	const rootPath = "./root";

	if (fs.existsSync(rootPath)) {
		return;
	}

	const files = [
		rootPath,
		`${rootPath}/home/luiseduardofrias/downloads`,
		`${rootPath}/home/luiseduardofrias/documents`,
		`${rootPath}/home/luiseduardofrias/images`,
		`${rootPath}/home/luiseduardofrias/videos`,
		`${rootPath}/home/luiseduardofrias/audios`,
	];

	try {
		files.forEach(file => {
			fs.mkdirSync(file, { recursive: true });
		});
	} catch (error) {
		console.error("Create_rootmap: ", error);
	}
}
