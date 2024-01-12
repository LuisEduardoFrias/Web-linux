/** @format */

export function getDataStorage(key: string) {
	try {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	} catch (error) {
		console.log(error);
	}
}

export function setDataStorage(key: string, data: object) {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (error) {
		console.log(error);
	}
}

export function removeDataStorage(key: string) {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.log(error);
	}
}
