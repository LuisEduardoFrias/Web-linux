/** @format */
"use client";

import Core from "./core";
import TuComponente from "./componente";
import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";
import { getDataStorage } from "hk/use_storage";

export default function Home() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), ["unblock"]);

	const storage = getDataStorage(process.env.NEXT_PUBLIC_.LOGIN_KEY);

	if (storage) {
		dispatch({
			type: actions.loginKey,
			unblock: state.unblock,
			loading: true
		});
	}

	return <Core />;
}
