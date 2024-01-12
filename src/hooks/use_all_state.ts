/** @format */
"use client";

import { useEffect, useReducer } from "react";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";
import { Post } from "hp/fetch";
import Middleware from "hp/middleware";
import { getDataStorage } from "hk/use_storage";

let _dispatch: any = null;
let _state: any = {};

export default function useAllState() {
	const [state, dispatch] = useReducer(Reducer, initialState());

	useEffect(() => {
		const storage = getDataStorage(process.env.NEXT_PUBLIC_.LOGIN_KEY);

		if (storage) {
			dispatch({
				type: actions.loginKey,
				unblock: state.unblock,
				loading: true
			});

			Post("token_check", {
				token: storage.login_key
			}).then(resp => {
				setTimeout(() => {
					dispatch({
						type: actions.loginKey,
						unblock: resp.unblock,
						loading: false
					});
				}, 1500);
			});
		}
	}, []);

	_dispatch = dispatch;
	_state = state;
	return state;
}

export function getState() {
	//alert("allstate: " + JSON.stringify(_state));
	return _state;
}

export function Dispatch(value: any) {
	Middleware(value, _dispatch);
}
