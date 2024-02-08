/** @format */

"use client";

import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import CircularJSON from "circular-json";
import Draggable from "react-draggable";

import Dk from "md/desk";
import Size from "md/size";
import Point from "md/point";
import Wd, { WindowState } from "md/window";

import LdDualRing from "cp/ld_dual_ring";
import Icon from "cp/icon";

import { actions } from "hp/reducer";
import useWindow from "hk/use_window";
import useSize from "hk/use_size";
import styles from "st/window.module.css";

interface IWindowpProps {
	wd: Wd;
	haveFocus: boolean;
}

export default function Window({
	wd,
	haveFocus
}: IWindowpProps): React.ReactElement {
	//
	const [_wd, setWd, dph] = useWindow(wd);

	return (
		<WindowDraggable {..._wd}>
			<WindowResize {..._wd} haveFocus={haveFocus} setWd={setWd}>
				<WindowBar {..._wd} setWd={setWd} dispatch={dph} />
				<WindowContainer {..._wd} />
			</WindowResize>
		</WindowDraggable>
	);
}

function WindowDraggable({
	state,
	point,
	children
}: {
	state: WindowStateñ;
	point: Point;
	children: React.ReactElement;
}): React.ReactElement {
	return (
		<Draggable
			axis={"both"}
			handle='.handle'
			bounds={{ left: -1000, top: 0, right: 1000, bottom: 1000 }}
			//disabled={state == WindowState.maximum ? true : false}
			//defaultPosition={{ x: point.x, y: point.y }}
			//	positionOffset={{ x: 0, y: 0 }}
			scale={1}>
			{children}
		</Draggable>
	);
}

function WindowResize({
	haveFocus,
	size,
	point,
	children
}: {
	haveFocus: boolean;
	size: Size;
	point: Point;
	children: React.ReactNode;
}): React.ReactElement {
	//
	const _style = {
		width: `${size.w}px`,
		height: `${size.h - 30}px`,
		left: `${point.x}px`,
		top: `${point.y}px`,
		ZIndex: `${haveFocus ? 3 : 2}`
	};

	return (
		<div className={styles.window_resize_out} style={_style}>
			<div className={styles.window_resize_in}>{children}</div>
		</div>
	);
}

function WindowBar({
	keys,
	title,
	app,
	setWd,
	dispatch
}: {
	keys: string;
	title: string;
	app: AppMetaData;
	setWd: (value: Wd) => void;
	dispatch: (value: object) => void;
}): React.ReactElement {
	//
	const size = useSize();
	//
	function handleMinized() {
		setWd((prev: Wd) => {
			const wd_: Wd = { ...prev };
			wd_.size.w = 0;
			wd_.size.h = 0;
			wd_.point.x = 0;
			wd_.point.y = -1000;
			wd_.state = WindowState.minimized;
			return { ...wd_ };
		});
		dispatch({ type: actions.minimized, app });
	}
	//
	function handleChangeState() {
		setWd((prev: Wd) => {
			const wd_: Wd = { ...prev };
			if (wd_.state == WindowState.maximum) {
				wd_.size.w = size.width / 2;
				wd_.size.h = size.height / 2;
				wd_.point.x = size.width / 2 - wd_.size.w / 2;
				wd_.point.y = size.height / 2 - wd_.size.h / 2;
				wd_.state = WindowState.normal;
			} else if (wd_.state == WindowState.normal) {
				wd_.size.w = size.width;
				wd_.size.h = size.height;
				wd_.point.x = 0;
				wd_.point.y = 0;
				wd_.state = WindowState.maximum;
			}
			return { ...wd_ };
		});
	}
	//
	function handleClose() {
		dispatch({ type: actions.closeApp, windowKey: keys });
	}
	//
	function handleFocus() {
		dispatch({ type: actions.windowFocus, key: keys });
	}
	//
	return (
		<div className={styles.container_bar}>
			<div className={`handle ${styles.bar_title}`} onClick={handleFocus}>
				<span>{title}</span>
			</div>
			<div className={styles.bar_control}>
				{/*minimized*/}
				<buttonControl
					className={styles.icon}
					onClick={handleMinized}></buttonControl>
				{/*maximumNormal*/}
				<buttonControl
					className={styles.icon}
					onClick={handleChangeState}></buttonControl>
				{/*close*/}
				<buttonControl
					className={styles.icon}
					onClick={handleClose}></buttonControl>
			</div>
		</div>
	);
}

function buttonControl({
	props,
	children
}: {
	props: any;
	children: React.ReactNode;
}): React.ReactElement {
	return <button {...props}>{children}</button>;
}

function WindowContainer({
	url,
	size,
	point
}: {
	url: string;
	size: Size;
	point: Point;
}): React.ReactElement {
	//
	const DynamicComponet = useMemo(
		() =>
			dynamic(() => import(`../../root/bin/${url}`), {
				ssr: false,
				loading: () => (
					<LdDualRing
						width={size.w}
						height={size.h}
						x={point.x}
						y={point.y + 50}
						show={true}
					/>
				)
			}),
		[url]
	);

	return (
		<div className={styles.container}>
			<DynamicComponet />
		</div>
	);
}

/*

// Tipos:
type DraggableEventHandler = (e: Event, data: DraggableData) => void | false;
type DraggableData = {
  node: HTMLElement, // lastX + deltaX === x
  x: number,
  y: number,
  deltaX: number,
  deltaY: number,
  lastX: number,
  lastY: number
};

// Propiedades:
  // Si se establece en `true`, permitirá arrastrar con clics que no sean el botón izquierdo.
  allowAnyClick: boolean,
  // Determina en qué eje puede moverse el elemento arrastrable. Esto solo afecta
  // al volcado en el DOM. Las devoluciones de llamada seguirán incluyendo todos los valores.
  // Valores aceptados:
  // - `both` permite el movimiento horizontal y vertical (predeterminado).
  // - `x` limita el movimiento al eje horizontal.
  // - `y` limita el movimiento al eje vertical.
  // - 'none' detiene todo movimiento.
  axis: string,
  // Especifica los límites de movimiento. Valores aceptados:
  // - `parent` restringe el movimiento dentro del offsetParent del nodo
  // (el nodo más cercano con posición relativa o absoluta), o
  // - un selector, restringe el movimiento dentro del nodo objetivo
  // - Un objeto con propiedades `left, top, right y bottom`.
  // Estos indican hasta dónde en cada dirección el elemento arrastrable
  // se puede mover.
  bounds: {left?: number, top?: number, right?: number, bottom?: number} | string,
  // Especifica un selector a utilizar para evitar la inicialización del arrastre. La cadena se pasa a
  // Element.matches, por lo que es posible usar múltiples selectores como `.primero, .segundo`.
  // Ejemplo: '.cuerpo'
  cancel: string,
  // Nombres de clases para la interfaz de arrastre.
  // Por defecto son 'react-draggable', 'react-draggable-dragging' y 'react-draggable-dragged'.
  defaultClassName: string,
  defaultClassNameDragging: string,
  defaultClassNameDragged: string,
  // Especifica el `x` e `y` en el que debería comenzar el elemento arrastrado.
  // Generalmente no es necesario usar esto (puede usar posicionamiento absoluto o relativo del
  // hijo directamente), pero puede ser útil para la uniformidad en
  // sus devoluciones de llamada y con transformaciones de css.
  defaultPosition: {x: number, y: number},
  // Si es verdadero, no llamará a ningún controlador de arrastre.
  disabled: boolean,

// Especifica el x e y al que se debe acoplar el arrastre.
grid: [número, número], 
// Especifica un selector que se utilizará como el controlador que inicia el arrastre.
// Ejemplo: '.manija'
handle: cadena, 
// Si se desea, puede proporcionar su propio offsetParent para cálculos de arrastre.
// Por defecto, usamos el offsetParent de Draggable. Esto puede ser útil para elementos
// con tipos de visualización extraños o floats.
offsetParent: HTMLElement, 
// Llamado cada vez que el usuario presiona el ratón. Llamado independientemente del controlador o
// estado deshabilitado.
onMouseDown: (e: MouseEvent) => void, 
// Llamado cuando comienza el arrastre. Si se devuelve `false` en cualquier controlador,
// la acción se cancelará.
onStart: DraggableEventHandler, 
// Llamado mientras se arrastra.
onDrag: DraggableEventHandler, 
// Llamado cuando se detiene el arrastre.
onStop: DraggableEventHandler, 
// Si se está ejecutando en el modo estricto de React, ReactDOM.findDOMNode() está obsoleto.
// Desafortunadamente, para que <Draggable> funcione correctamente, necesitamos acceso directo
// al nodo DOM subyacente. Si desea evitar la advertencia, pase un `nodeRef`
// como en este ejemplo:
// 
// function MyComponent() {
//   const nodeRef = React.useRef(null);
//   return (
//     <Draggable nodeRef={nodeRef}>
//       <div ref={nodeRef}>Ejemplo de destino</div>
//     </Draggable>
//   );
// }
// 
// Esto se puede utilizar para componentes arbitrariamente anidados, siempre y cuando la referencia termine
// apuntando al nodo DOM hijo real y no a un componente personalizado.
// 
// Para componentes ricos, es necesario reenviar tanto la referencia como las props al DOM subyacente
// elemento. Las props deben reenviarse para que se puedan adjuntar controladores de eventos DOM.
// Por ejemplo:
// 
// const Componente1 = React.forwardRef(function (props, ref) {
//   return <div {...props} ref={ref}>Componente anidado</div>;
// });
// 
// const nodeRef = React.useRef(null);
// <DraggableCore onDrag={onDrag} nodeRef={nodeRef}>
//   <Componente1 ref={nodeRef} />
// </DraggableCore>
// 
// Gracias a react-transition-group por la inspiración.
// 
// `nodeRef` también está disponible en <DraggableCore>.
nodeRef: React.Ref<typeof React.Component>, 
// Al igual que los elementos de formulario de React, si esta propiedad está presente, el elemento
// se vuelve 'controlado' y no responde a la entrada del usuario. Utilice `position`
// si necesita tener un control directo del elemento.
position: {x: número, y: número}, 
// Un desplazamiento de posición para comenzar. Útil para dar una posición inicial
// al elemento. Difiere de `defaultPosition` en que no afecta la posición devuelta en las devoluciones de llamada de arrastre, y en que
// acepta cadenas, como `{x: '10%', y: '10%'}`.
positionOffset: {x: número | cadena, y: número | cadena}, 
// Especifica la escala del lienzo en el que está arrastrando este elemento. Esto permite
// por ejemplo, obtener los desplazamientos de arrastre correctos mientras está zoomado dentro o fuera a través de
// una transformación o matriz en el padre de este elemento.
scale: número
*/
