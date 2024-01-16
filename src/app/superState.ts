/** @format */

import React, { useReducer } from "react";

type Action<T extends any, P = undefined> = P extends undefined
	? { type: T }
	: { type: T } & P;
type Subscriber = { props: string[]; wasCalled: boolean; disp: Action };
type Reducer = (state: object, action: Action) => object;

const UPDATE_OBTION_ID:string = "__update_obtion_id__";
const subscriber: Subscriber = {};
const globalState: object = {};

//type ObserverFunction = (caller: string) => void;

function subscribe(props: string[], id: string): void {
	if (!subscriber[id]) {
		Reflect.set(subscriber, id, {
			props,
			wasCalled: false,
			disp: null
		});
	}
}

function middledistpach(Action: object, reducer: Reducer): void {
	const newState: object = reducer(globalState, action);

	const changedProperties = getChangedProperties(globalState, newState);

	updateGlobalState(newState, changedProperties);

	changedProperties.forEach((p: string) => {
		for (let key in subscriber) {
			subscriber[key].props.forEach((pr: string) => {
				if (p === pr && subscriber[key].wasCalled === false) {
					subscriber[key].disp({ type: UPDATE_OBTION_ID });
					subscriber[key].wasCalled = true;
				}
			});
		}
	});

	for (let key in subscriber) {
		subscriber[key].wasCalled = false;
	}
}

function getChangedProperties(oldState: object, newState: object): string[] {
	const changedProperties: string[] = [];
	for (const key in newState) {
		if (oldState[key] !== newState[key]) changedProperties.push(key);
	}
	return changedProperties;
}

function updateGlobalState(
	newState: object,
	modifiedProperties: string[]
): void {
	if (Reflect.ownKeys(globalState).length === 0) {
		Reflect.ownKeys(newState).forEach((key: string) =>
			Reflect.set(globalState, key, newState[key])
		);
	} else {
		modifiedProperties.forEach((key: string) => {
			Reflect.set(globalState, key, newState[key]);
		});
	}
}

export default function useSuperState(
	reducer: Reducer,
	initalState: object,
	props: string[]
) {
	function middlereducer(state: object, action: Action): object {
		if (action.type === UPDATE_OBTION_ID) {
			return {
				...globalState,
				__obtionId__: globalState.__obtionId__
					? globalState.__obtionId__ === 10
						? 0
						: globalState.__obtionId__ + 1
					: 0
			};
		}
		return reducer(state, action);
	}

	const [state, dispatch] = useReducer(middlereducer, initalState);

	const callerFunction = new Error().stack?.split("\n")[2].trim().split(" ")[1];

	subscribe(props, callerFunction);

	if (Reflect.ownKeys(globalState).length === 0) {
		Reflect.ownKeys(initalState).forEach((e: string) =>
			Reflect.set(globalState, e, initalState[e])
		);
	}

	if (!subscriber[callerFunction].disp) {
		Reflect.set(subscriber[callerFunction], "disp", dispatch);
	}

	return [
		returnStateForSubscribe(globalState, callerFunction),
		(value: object) => middledistpach(value, reducer)
	];
}

function returnStateForSubscribe(state: object, callerFunction: string) {
	const newState = {};
	if (subscriber[callerFunction])
		subscriber[callerFunction].props.forEach((pr: string) => {
			Reflect.set(newState, pr, state[pr]);
		});

	return newState;
}
