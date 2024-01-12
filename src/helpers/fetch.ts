/** @format */

const BASE_URL = "http://localhost:3000/api/";

export async function Post(endpoint: string, st: object): any {
	const resp = await fetch(new URL(BASE_URL + endpoint), {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(st)
	});

	return await checkResponse(resp);
}

export async function Get(endpoint: string): any {
	const resp = await fetch(new URL(BASE_URL + endpoint), {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	return await checkResponse(resp);
}

async function checkResponse(resp: any) {
	if (resp.ok) {
		const contentType = resp.headers.get("content-type");
		if (contentType && contentType.includes("application/json")) {
			return await resp.json();
		}
	} else {
		//alert("throw Error('error de la solicitud');");
	}
}
