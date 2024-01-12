/** @format */

import { Get, Post } from "hp/fetch";
import {
	setDataStorage,
	removeDataStorage,
	getDataStorage
} from "hk/use_storage";

export default function Middleware(action: object, dispatch: any): void {
	const _actions = {
		unblock: () => {
			if (!action.user && !action.password)
				throw new Error("faltan credenciales, user or password");

			(async () => {
				const resp = await Post("unblock", {
					user: action.user,
					password: action.password
				});

				setDataStorage(process.env.NEXT_PUBLIC_.LOGIN_KEY, {
					login_key: resp.token
				});

				dispatch({ type: action.type, unblock: resp.unblock });
			})();
		},
		lock() {
			(async () => {
				const data = getDataStorage(process.env.NEXT_PUBLIC_.LOGIN_KEY);

				if (data) {
					const resp = await Post("lock", {
						login_key: data.login_key
					});
					
					removeDataStorage(process.env.NEXT_PUBLIC_.LOGIN_KEY);

					dispatch({ type: action.type });
				}
			})();
		},
		default: () => {
			dispatch(action);
		}
	};

	(_actions[action.type] || _actions["default"])();
}
