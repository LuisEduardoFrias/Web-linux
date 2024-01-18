/** @format */

import React, { useReducer } from "react";

//Types
type Action<T extends any, P = undefined> = P extends undefined
	? { type: T }
	: { type: T } & P;
type Subscriber = {
	props: string[];
	wasCalled: boolean;
	disp: (action: Action) => object;
};
type Reducer = (state: object, action: Action) => object;

//Constans
const UPDATE_OBTION_ID: string = "__update_obtion_id__";
const subscriber: Subscriber = {};
const globalState: object = {};

//subscribe the components
function subscribe(
	props: string[],
	id: string,
	dispatch: (action: Action) => object
): void {
	if (!subscriber[id]) {
		Reflect.set(subscriber, id, {
			props,
			wasCalled: false,
			disp: dispatch
		});
	}
}

//clone object
function clone(obj: object) {
	return JSON.parse(JSON.stringify(obj));
}

//intermediador del dispatch
function middledistpach(action: Action, reducer: Reducer): void {
	//
	const newState: object = reducer(clone(globalState), action);

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

//retorna las propiedades que an sido actializadas.
function getChangedProperties(oldState: object, newState: object): string[] {
	const changedProperties: string[] = [];
	for (const key in newState) {
		if (JSON.stringify(oldState[key]) !== JSON.stringify(newState[key]))
			changedProperties.push(key);
	}
	return changedProperties;
}

//update the global state
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

//the hook
export default function useSuperState(
	reducer: Reducer,
	initalState: object,
	props: string[]
) {
	function middlereducer(state: object, action: Action): object {
		//se ejecuta cuando se requiere actializar el estado de determ8nado suscriptor
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

		//TODO validar si eventual mente este reducer se ejecuta.
		return reducer(state, action);
	}

	const [state, dispatch] = useReducer(middlereducer, initalState);

	console.log("state updated");
	//Octiene el nombre del componente
	const callerFunction = new Error().stack?.split("\n")[2].trim().split(" ")[1];

	//suscribe el componentes
	subscribe(props, callerFunction, dispatch);

	//Inicializa el estado global
	if (Reflect.ownKeys(globalState).length === 0) {
		Reflect.ownKeys(initalState).forEach((e: string) =>
			Reflect.set(globalState, e, initalState[e])
		);
	}

	//Añade el dispatch al suscriptor
	/*	if (!subscriber[callerFunction].disp) {
	  	Reflect.set(subscriber[callerFunction], "disp", dispatch);
	} */

	return [
		returnStateForSubscribe(globalState, callerFunction),
		(value: Action) => middledistpach(value, reducer)
	];
}

//retorna el estado con las propiedades especificas a las suscriptas.
function returnStateForSubscribe(state: object, callerFunction: string) {
	const newState = {};
	if (subscriber[callerFunction])
		subscriber[callerFunction].props.forEach((pr: string) => {
			Reflect.set(newState, pr, state[pr]);
		});

	return newState;
}
