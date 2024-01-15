/** @format */

import React, { useReducer, useMeno, useCallback } from "react";

const subscriber: object = {};
const globalState: object = {};

//type ObserverFunction = (caller: string) => void;

function subscribe(props: string[], id: string) {
	if (!subscriber[id])
		Reflect.set(subscriber, id, {
			props,
			oldProps: {}
		});
}

function middleware(value: any) {
	const callSubscriber = useCallback(() => {
		alert("callSubscriber");
		if (state.hasOwnProperty("changedProperties"))
			state.changedProperties.forEach(p =>
				Reflect.ownKeys(subscriber).forEach(s => {
					subscriber[s].props.forEach(pr => {
						if (p === pr) {
							const newObj: object = {};

							for (let i: number = 0; i < subscriber[s].props.length; i++) {
								subscriber[s].props.forEach(o =>
									Reflect.set(newObj, o, globalState[o])
								);
							}
							subscriber[s].disp({ type: state.action, value: newObj[p] });
						}
					});
				})
			);
	}, [globalState]);

	const newState: object = reducer(state, action);
	const changedProperties = getChangedProperties(state, newState);
	updateGlobalState(newState, changedProperties);
	Reflect.set(newState, "changedProperties", changedProperties);
	Reflect.set(newState, "action", action.type);
	return newState;

	callSubscriber();
}

function getChangedProperties(oldState: object, newState: object): string[] {
	const changedProperties: string[] = [];
	for (const key in newState) {
		if (oldState[key] !== newState[key]) changedProperties.push(key);
	}
	return changedProperties;
}

function updateGlobalState(newState: object, modifiedProperties: string[]) {
	if (Reflect.ownKeys(globalState).length === 0) {
		Reflect.ownKeys(newState).forEach(key =>
			Reflect.set(globalState, key, newState[key])
		);
	} else {
		modifiedProperties.forEach(key =>
			Reflect.set(globalState, key, newState[key])
		);
	}
}

export default function useSuperState(
	reducer: any,
	initalState: any,
	props: string[]
) {
	alert("init");

	const callerFunction = useMeno(() => {
		alert("callerFunction");
		return new Error().stack?.split("\n")[2].trim().split(" ")[1];
	}, [reducer, initalState, props]);

	const executeSubscribe = useCallback(
		(callerFunction: any) => {
			alert("subscribe");
			subscribe(props, callerFunction);
		},
		[callerFunction]
	);
	executeSubscribe(callerFunction);

	const executeInitComponet = useCallback(
		(initalState: any) => {
			alert("init globalState");
			Reflect.ownKeys(initalState).forEach(e =>
				Reflect.set(globalState, e, initalState[e])
			);
		},
		[initalState]
	);
	executeInitComponet(initalState);

	const [state, dispatch] = useReducer(reducer, initalState);

	alert("execute reducer");

	const setDespatch = useCallback(
		(subscriber: any, callerFunction: any, dispatch: any) => {
			alert("set despatch");

			Reflect.set(subscriber[callerFunction], "disp", dispatch);
		},
		[subscriber, callerFunction, dispatch]
	);

	setDespatch(subscriber, callerFunction, dispatch);

	return [state, middleware];
}
