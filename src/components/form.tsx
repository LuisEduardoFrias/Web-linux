/** @format */

"use client";

import React, {
	useState,
	useEffect,
	useRef,
	createRef,
	ReactElement,
	ChangeEvent
} from "react";

import CircularJSON from "circular-json";
import LdDualRing from "cp/ld_dual_ring";

type ChildRequired = {
	key: string;
	index: number;
};

/*const al = (value: any, st?: string) =>
	alert(`${st}: ` + CircularJSON.stringify(value));

const cl = (value: any, st?: string) =>
	console.log(`${st}: ` + CircularJSON.stringify(value));
*/
interface IFormsProp<T> {
	onSubmit: (data: T[], setLoader: (show: boolean) => void) => boolean;
	children: ReactElement | ReactElement[];
	className?: string;
	dataFile?: boolean;
}

export default function Form<T>(props: IFormsProp<T>): ReactElement {
	const [state, setState] = useState<T[]>([]);
	const [childRequired, setChildRequired] = useState<ChildRequired[]>([]);

	const itemsRef = useRef([]);

	/*	useEffect(() => {
	  	itemsRef.current = itemsRef.current.slice(0, props.children.length);
	}, []);
	*/

	const formComponents = Array.isArray(props.children)
		? props.children
		: [props.children];

	const resp = formComponents.map((child: ReactElement, index: number) =>
		addOnChangeToFormComponents(child, index, setState, itemsRef, childRequired)
	);

	const ClonedComponents: any = resp.map(e => e.clonedComponents);

	const defaultState_: any = resp
		.map(e => e.defaultState)
		.filter(e => e !== null && e !== undefined)
		.map(e => {
			const newObj: object = {};
			Reflect.set(newObj, e.key, e.value);
			return newObj;
		});

	alert("defaultState: " + JSON.stringify(defaultState_));

	let childRequired_: object[] = [];
	resp.map(e => {
		if (Array.isArray(e.childRequired)) {
			childRequired_.push(...e.childRequired);
		} else {
			childRequired_.push(e.childRequired);
		}
	});

	childRequired_ = childRequired_.filter(e => e !== null && e !== undefined);

	return (
		<__Form__
			ClonedComponents={ClonedComponents}
			itemsRef={itemsRef}
			setState={setState}
			childRequired={childRequired}
			state={state}
			className={props.className}
			setChildRequired={setChildRequired}
			defaultState_={defaultState_}
			childRequired_={childRequired_}
			onSubmit={props.onSubmit}
		/>
	);
}

function __Form__({
	ClonedComponents,
	itemsRef,
	defaultState_,
	setState,
	childRequired,
	state,
	className,
	setChildRequired,
	childRequired_,
	onSubmit
}: {
	ClonedComponents: any;
	itemsRef: any;
	defaultState_: object[];
	setState: any;
	childRequired: any;
	state: any;
	className: string;
	setChildRequired: any;
	childRequired_: any;
	onSubmit: any;
}) {
	const [showLoader, setShowLoader] = useState(false);

	useEffect(() => {
		setState(prev => {
			const _prev: object = { ...prev };

			defaultState_.forEach(e => {
				const key = Reflect.ownKeys(e);
				const value = Reflect.get(e, key);
				Reflect.set(_prev, key, value);
			});

			return { ...prev, ..._prev };
		});

		setChildRequired(childRequired_);
	}, []);

	useEffect(() => {}, [showLoader]);

	return (
		<>
			<LdDualRing show={showLoader} />
			<form
				onSubmit={event => {
					event.preventDefault();
					Submit(
						event,
						childRequired,
						itemsRef,
						state,
						setShowLoader,
						onSubmit
					);
				}}
				className={className}>
				{ClonedComponents}
			</form>
		</>
	);
}

async function Submit<T>(
	event: React.FormEvent<HTMLFormElement>,
	childRequired: ChildRequired[],
	itemsRef: any,
	state: T[],
	setShowLoader: boolean,
	onSubmit: (data: T[], setLoader: (show: boolean) => void) => boolean
) {
	let thereAreRequited: boolean = false;
	setShowLoader(true);

	/* childRequired.forEach(e => {
		if (!state[e.key]) {
			changeVisibilityRequired(null, e, true, itemsRef);
			thereAreRequited = true;
		}
	});
  */

	if (!thereAreRequited) {
		if (await onSubmit(state, setShowLoader)) {
			clear();
		}
	} else {
		setShowLoader(false);
	}
}

function changeVisibilityRequired(
	forValue: string | null,
	childRequired: ChildRequired,
	visible: boolean,
	itemsRef: any
) {
	let _element: any = null;
	/*(	if (!forValue) {
	   	_element = itemsRef.current[childRequired.index];
	} else {
		_element = itemsRef.current[childRequired[forValue].index];
	}
		_element.props.style.display = visible ? "block" : "none";
		_element.props.style.opacity = visible ? "1" : "0";*/
}

function addRequiredItem(child: ReactElement, itemsRef: any): ReactElement {
	if (child) {
		const for_: string = child.props.htmlFor;

		const clon: HTMLInputElement = React.cloneElement(child, {
			...child.props,
			style: {
				...child.props.style,
				color: "red",
				//display: "none",
				opacity: "0"
			}
		});

		itemsRef.current.push(clon);
		const index: number = itemsRef?.current?.length ?? 0;

		return { clone: clon, childRequired: { key: for_, index: index } };
	}

	return { clone: child };
}

function clear() {
	const formElements = Array.from(
		document.querySelectorAll("input, select, textarea")
	) as HTMLElement[];

	formElements.forEach((element: HTMLElement) => {
		if ("type" in element && typeof element.type === "string") {
			const elementType = element.type.toLowerCase();
			switch (elementType) {
				case "text":
				case "password":
				case "email":
				case "number":
				case "search":
				case "tel":
				case "url":
				case "textarea":
					(element as HTMLInputElement | HTMLTextAreaElement).value = "";
					break;

				case "radio":
				case "checkbox":
					(element as HTMLInputElement).checked = false;
					break;

				case "select-one":
				case "select-multiple":
					(element as HTMLSelectElement).selectedIndex = -1;
					break;

				default:
					break;
			}
		}
	});
}

function getInputValue(
	event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
): string | number {
	const target = event.currentTarget as
		| HTMLInputElement
		| HTMLTextAreaElement
		| HTMLSelectElement;

	const { type, name, value } = target;

	if (type === "number") {
		return Number(value);
	}

	return value;
}

function handleChange(
	e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	setState: (callback: (value: object[]) => object[]) => void,
	itemsRef: any,
	childRequired: ChildRequired
): void {
	if (e.currentTarget instanceof HTMLInputElement) {
		changeVisibilityRequired(e.target.id, childRequired, false, itemsRef);

		if (e.target.type === "file" && props.dataFile) {
			const file = e.target.files?.[0];
			const name = e.target?.name;

			if (file) {
				const reader = new FileReader();

				reader.onloadend = async () => {
					setState(prev => {
						return { ...prev, [name]: reader.result as string };
					});
				};

				reader.readAsDataURL(file);
			}
		} else {
			//("change: " + e.target.name)
			if (e.target?.name !== "") {
				const value = getInputValue(e);

				setState(prev => {
					return { ...prev, [e.target?.name]: value };
				});
			}
		}
	}
}

function handleChange2(
	e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	change: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => void,
	setState: (callback: (value: object[]) => object[]) => void,
	itemsRef: any,
	childRequired: ChildRequired
) {
	if (change) {
		Reflect.apply(change, null, [e]);
	}
	handleChange(e, setState, itemsRef, childRequired);
}

function addOnChangeToFormComponents(
	child: ReactElement,
	index: number,
	setState: (callback: (value: object[]) => object[]) => void,
	itemsRef: any,
	childRequired: ChildRequired
): ReactElement {
	if (!React.isValidElement(child)) return child;

	let cloneChild: ReactElement = child;
	let change: (e: any) => void = null;
	let _childRequired: ChildRequired = null;
	let _defaultState: object = null;

	if (cloneChild.props?.change) {
		change = cloneChild.props.change;
	}

	if (cloneChild.props.required === true) {
		/*	const resp = addRequiredItem(cloneChild, itemsRef);
	  	cloneChild = resp.clone;
	  	_childRequired = resp.childRequired;*/
	}

	if (cloneChild.props.defaultValue) {
		_defaultState = {
			key: cloneChild.props.name,
			value: cloneChild.props.defaultValue
		};
	}

	const count = React.Children.count(cloneChild.props.children);
	if (count > 0) {
		const resp = React.Children.map(
			cloneChild.props.children,
			(child: ReactElement, index: number) => {
				if (!React.isValidElement(child))
					return {
						clonedComponents: child,
						defaultState: null,
						childRequired: null
					};

				const resp: any = addOnChangeToFormComponents(
					child,
					index,
					setState,
					itemsRef,
					childRequired
				);

				return {
					clonedComponents: resp.clonedComponents,
					defaultState: resp.defaultState,
					childRequired: resp.childRequired
				};
			}
		);

		const clonedComponents_: any = resp.map(e => e.clonedComponents);
		cloneChild = React.cloneElement(cloneChild, {}, ...clonedComponents_);

		const defaultState_: any = resp
			.map(e => e.defaultState)
			.filter(e => e !== null);
		alert("agregando de: " + JSON.stringify(defaultState_));
		const childRequired_: any = resp
			.map(e => e.childRequired)
			.filter(e => e !== null);

		const answer: any = {
			clonedComponents: cloneChild,
			defaultState:
				defaultState_.length > 0
					? _childRequired !== null
						? [...defaultState_, _defaultState]
						: defaultState_
					: _defaultState,
			childRequired:
				childRequired_.length > 0
					? _childRequired !== null
						? [...childRequired_, _childRequired]
						: childRequired_
					: _childRequired
		};

		return answer;
	}

	if (cloneChild.props.onChange === undefined) {
		cloneChild = React.cloneElement(cloneChild, {
			onChange: (e: any) =>
				handleChange2(e, change, setState, itemsRef, childRequired),
			key: index
		});
	}

	return {
		clonedComponents: cloneChild,
		defaultState: _defaultState,
		childRequired: _childRequired
	};
}
