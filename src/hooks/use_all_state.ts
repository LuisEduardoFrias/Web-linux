/** @format */
"use client";

import { useEffect, useReducer, useState } from "react";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";
import { Post } from "hp/fetch";
import Middleware from "hp/middleware";
import { getDataStorage } from "hk/use_storage";

let _dispatch: any = null;
let _state: any = {};
let _suscribers: object[] = [];

export default function useAllState() {
	const [state, dispatch] = useReducer(Reducer, initialState());
	alert("all state");
	useEffect(() => {
		_suscribers.forEach(e => {
			const propState = Reflect.get(state, e.prop);
			if (e.oldState !== propState) e.setter(propState);
		});
	}, [state]);

	useEffect(() => {
		_suscribers.forEach(e => e.setter(Reflect.get(state, e.prop)));

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
	Middleware(value, _dispatch, {..._state});
}

export function suscriber(setState: any, prop: string): void {
	//_suscribers = { setter: setState, prop };
}

export function superState(prop: string, id: string) {
	const [state, setState] = useState(Reflect.get(_state, prop));

	if (_suscribers.filter(e => e.id === id).length === 0) {
		_suscribers.push({
			prop,
			id,
			setter: setState,
			oldState: state
		});

		return [state, setState];
	}

	return [state, setState];
}
