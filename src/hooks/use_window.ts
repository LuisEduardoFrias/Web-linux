/** @format */

import React, { useState, useEffect } from "react";
import { WindowState } from "md/window";
import useSuperState from "hk/use_super_state";
import Reducer from "hp/reducer";
import initialState from "hp/initial_state";
import useSize from "hk/use_size";

export default function useWindow(wd: Wd) {
	//
	const [state, dispatch] = useSuperState(Reducer, initialState(), []);

	const size = useSize();
	const [_wd, setWd] = useState(wd);

	useEffect(() => {
		setWd((prev: Wd) => {
			const wd_: Wd = { ...prev };

			if (wd_.state == WindowState.normal) {
				wd_.size.w = size.width / 2;
				wd_.size.h = size.height / 2;
				wd_.point.x = size.width / 2 - wd_.size.w / 2;
				wd_.point.y = size.height / 2 - wd_.size.h / 2;
			} else if (wd_.state == WindowState.maximum) {
				wd_.size.w = size.width;
				wd_.size.h = size.height;
				wd_.point.x = 0;
				wd_.point.y = 0;
			}
			return { ...wd_ };
		});
	}, [size]);

	return [_wd, setWd, dispatch];
}
