/** @format */
import {useState, useEffect} from "react";

export function getDataStorage(key: string) {
	try {
		const storage = localStorage.getItem(key);
		return storage ? JSON.parse(storage) : null;
	} catch (err: string) {
		getDataStorage(key);
	}
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
