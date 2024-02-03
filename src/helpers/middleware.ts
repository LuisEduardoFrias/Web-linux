/** @format */

import { Get, Post } from "hp/fetch";
import {
	setDataStorage,
	removeDataStorage,
	getDataStorage
} from "hk/use_storage";

export default function Middleware(
	action: object,
	state: any,
	dispatch: any
): void {
	const _actions = {
		unblock: () => {
			if (!action.user && !action.password)
				throw new Error("faltan credenciales, user or password");
			(async () => {
				const resp = await Post("unblock", {
					user: action.user,
					password: action.password
				});

				if (resp.unblock) {
					setDataStorage(process.env.NEXT_PUBLIC_.LOGIN_KEY, {
						login_key: resp.token
					});

					dispatch({
						type: action.type,
						unblock: resp.unblock,
						apps: await getApp(resp.token)
					});
				}

				action.hidderLoader();
			})();
		},
		loginKey: () => {
			(async () => {
				dispatch({
					type: action.type,
					unblock: action.unblock,
					loading: action.loading,
					apps: await getApp(action.storage.login_key)
				});
			})();
		},
		lock() {
			(async () => {

				const resp = await Post("lock", {
					login_key: action.login_key
				});

				removeDataStorage(process.env.NEXT_PUBLIC_.LOGIN_KEY);

				dispatch({ type: action.type });

				action.hiddenLoader();
			})();
		},
		default: () => {
			dispatch(action);
		}
	};

	(_actions[action.type] || _actions["default"])();
}

async function getApp(token: string) {
	const appsResp = await Post("get_app", { login_key: token });

	return appsResp.apps;
}
