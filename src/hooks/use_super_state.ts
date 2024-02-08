/** @format */

import React, { useReducer } from "react";

//Types
type Action<T extends any, P = undefined> = P extends undefined
	? { type: T }
	: { type: T } & P;

type Subscriber = {
	props: string[] | ((state: any, state: any, prop: string | null) => boolean);
	wasCalled: boolean;
	disp: (action: Action) => object;
};

type Reducer = (state: object, action: Action) => object;

//Constans
const UPDATE_OBTION_ID: string = "__update_obtion_id__";
const SUBSCRIBER: Subscriber = {};
const GLOBAL_STATE: object = {};

//Compare two objcets
export function Equal(obj1: object, obj2: object): boolean {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}

//subscribe the components
function Subscribe(
	props: string[] | ((state: any, state: any, prop: string | null) => boolean),
	id: string,
	dispatch: (action: Action) => object
): void {
	if (!SUBSCRIBER[id])
		Reflect.set(SUBSCRIBER, id, {
			props,
			wasCalled: false,
			disp: dispatch
		});
}

//Clone object
export function Clone(obj: object) {
	return { ...JSON.parse(JSON.stringify(obj)) };
}

//intermediador del dispatch
function MiddleDistpach(action: Action, reducer: Reducer): undefined {
	//
	const oldState: any = Clone(GLOBAL_STATE);

	const newState: object = reducer(Clone(GLOBAL_STATE), action);

	const changedProperties = GetChangedProperties(GLOBAL_STATE, newState);

	UpdateGlobalState(newState, changedProperties);

	changedProperties.forEach((p: string) => {
		for (let key in SUBSCRIBER) {
			if (typeof SUBSCRIBER[key].props === "function") {
				//TODO verificar esta propiedad antes de lalame la funcion
				//delete GLOBAL_STATE?.__obtionId__;
				if (
					SUBSCRIBER[key].props(GLOBAL_STATE[key], oldState, key) &&
					SUBSCRIBER[key].wasCalled === false
				) {
					SUBSCRIBER[key].disp({ type: UPDATE_OBTION_ID });
					SUBSCRIBER[key].wasCalled = true;
				}
			} else {
				for (let key of SUBSCRIBER[key].props) {
					if (
						(p === pr || pr === "all") &&
						SUBSCRIBER[key].wasCalled === false
					) {
						SUBSCRIBER[key].disp({ type: UPDATE_OBTION_ID });
						SUBSCRIBER[key].wasCalled = true;
						break;
					}
				}
			}
		}
	});

	for (let key in SUBSCRIBER) {
		SUBSCRIBER[key].wasCalled = false;
	}

	return undefined;
}

//retorna las propiedades que an sido actializadas.
function GetChangedProperties(oldState: object, newState: object): string[] {
	const changedProperties: string[] = [];

	for (const key in newState)
		if (!Equal(oldState[key], newState[key])) changedProperties.push(key);

	return changedProperties;
}

//update the global state
function UpdateGlobalState(
	newState: object,
	modifiedProperties: string[]
): void {
	if (Reflect.ownKeys(GLOBAL_STATE).length === 0) {
		Reflect.ownKeys(newState).forEach((key: string) =>
			Reflect.set(GLOBAL_STATE, key, newState[key])
		);
	} else {
		modifiedProperties.forEach((key: string) => {
			Reflect.set(GLOBAL_STATE, key, newState[key]);
		});
	}
}

//the hook
export default function useSuperState(
	reducer: Reducer,
	initalState: object,
	props: string[] | ((state: any, state: any, prop: string | null) => boolean),
	preDispatch?: (
		action: Action,
		state: object,
		dispatch: (action: Action) => void
	) => void
) {
	function MiddleReducer(state: object, action: Action): object {
		//se ejecuta cuando se requiere actializar el estado de determinado suscriptor
		if (action.type === UPDATE_OBTION_ID) {
			return {
				...GLOBAL_STATE,
				__obtionId__: GLOBAL_STATE.__obtionId__
					? GLOBAL_STATE.__obtionId__ === 10
						? 0
						: GLOBAL_STATE.__obtionId__ + 1
					: 0
			};
		}

		//TODO validar si eventual mente este reducer se ejecuta.
		alert("TODO Desde useSuperState");
		return reducer(state, action);
	}

	const [state, dispatch] = useReducer(MiddleReducer, initalState);

	//	console.log("state updated");
	//Octiene el nombre del componente, desbe de estar tal y cual en esta funcion.
	const callerFunction = new Error().stack?.split("\n")[2].trim().split(" ")[1];

	//suscribe el componentes
	Subscribe(props, callerFunction, dispatch);

	//Inicializa el estado global
	if (Reflect.ownKeys(GLOBAL_STATE).length === 0) {
		Reflect.ownKeys(initalState).forEach((e: string) =>
			Reflect.set(GLOBAL_STATE, e, initalState[e])
		);
	}

	//Añade el dispatch al suscriptor
	/*	if (!SUBSCRIBER[callerFunction].disp) {
	  	Reflect.set(SUBSCRIBER[callerFunction], "disp", dispatch);
	} */

	return [
		ReturnStateForSubscribe(SUBSCRIBER[callerFunction]),
		(action: Action): undefined => {
			if (!preDispatch) return MiddleDistpach(action, reducer);

			preDispatch(action, GLOBAL_STATE, (_action: Action): void => {
				MiddleDistpach(_action, reducer);
			});
		}
	];
}

//retorna el estado con las propiedades especificas a las suscriptas.
function ReturnStateForSubscribe(callerFunction: object | undefined): object {
	const newState = {};
	if (callerFunction) {
		let Ar: Arry = [];
		//
		if (typeof callerFunction.props === "function") {
			Ar = callerFunction.props(null, null);
			if (Ar === undefined)
				throw Error("preDispatch required a Array with props to suscribe");
		} else {
			Ar = callerFunction.props;
		}
		//
		Ar.forEach((pr: string) => {
			if (pr === "all") return GLOBAL_STATE;

			if (GLOBAL_STATE[pr]) Reflect.set(newState, pr, GLOBAL_STATE[pr]);
		});
	}
	return newState;
}
