/** @format */
import { useState, useEffect } from "react";

export function getDataStorage(key: string) {
	const [storage, setStorage] = useState(null);

	useEffect(() => {
		setStorage(localStorage.getItem(key));
	}, []);
	
	return storage ? JSON.parse(storage) : null;
}

export function setDataStorage(key: string, data: object) {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (err: string) {
		setDataStorage(key, data);
	}
}

export function removeDataStorage(key: string) {
	try {
		localStorage.removeItem(key);
	} catch (err: string) {
		removeDataStorage(key);
	}
}
