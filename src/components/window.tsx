/** @format */

"use client";

import React, { useState, useMemo } from "react";
import Draggable from "react-draggable";
import dynamic from "next/dynamic";
import LdDualRing from "./ld_dual_ring";
import Icon from "./icon";
import Wd, { WindowState } from "md/window";
import useSize from "hk/use_size";
import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";
import styles from "st/window.module.css";

interface IWindowpProps {
	wd: Wd;
	windowsFocus: Wd;
	setFocus: () => {};
}

export default function Window(props: IWindowpProps) {
	const [state, dispatch] = useSuperState(Reducer, initialState(), []);
	const [_wd, setWd] = useState(props.wd);

	const size = useSize();

	_wd.size.w =
		_wd.state == WindowState.normal
			? size.width / 2
			: _wd.state == WindowState.maximum
			? size.width
			: 0;

	_wd.size.h =
		_wd.state == WindowState.normal
			? size.height / 2
			: _wd.state == WindowState.maximum
			? size.height
			: 0;

	_wd.point.x = 0; /*
		_wd.state == WindowState.normal ? size.width / 2 - _wd.size.w / 2 : 0; */

	_wd.point.y = 0;
	/*	_wd.state == WindowState.normal ? size.height / 2 - _wd.size.h / 2 : 0; */

	const DynamicComponet = useMemo(
		() =>
			dynamic(() => import(`../../root/bin/${_wd.url}`), {
				ssr: false,
				loading: () => (
					<LdDualRing
						width={_wd.size.w}
						height={_wd.size.h}
						x={_wd.point.x}
						y={_wd.point.y + 50}
						show={true}
					/>
				)
			}),
		[_wd.url]
	);

	function handleChangeState() {
		if (_wd.state == WindowState.maximum) {
			setWd({ ..._wd, state: WindowState.normal });
		} else if (_wd.state == WindowState.normal) {
			setWd({ ..._wd, state: WindowState.maximum });
		}
	}

	const _style = {
		width: `${_wd.size.w}px`,
		height: `${_wd.size.h - 30}px`,
		left: `${_wd.point.x}px`,
		top: `${_wd.point.y}px`
	};

	function Dispatch(obj: object) {
		if (obj.type !== "") {
			dispatch(obj);
		}
	}

	return (
		<Draggable
			axis='both'
			handle='.handle'
			bounds={{ left: -1000, top: 0, right: 1000, bottom: 1000 }}
			disabled={_wd.state == WindowState.maximum ? true : false}
			scale={1}>
			<div
				className={styles.window}
				style={_style}
				onClick={() => {
					if (props.windowsFocus?.key !== props.wd.key)
						props.setFocus();
				}}>
				<div className={styles.bar}>
					<div className={`handle ${styles.handle_}`}>
						<span>{_wd.title}</span>
					</div>
					<div className={styles.contro_size}>
						{/*minimized*/}
						<Icon className={styles.icon}></Icon> {/* close_fullscreen */}
						{/*maximum and normal*/}
						<Icon className={styles.icon} onclick={handleChangeState}>
							{/* _wd.state == WindowState.maximum
								? "fullscreen_exit"
								: "fullscreen" */}
						</Icon>
						{/*close*/}
						<Icon
							className={styles.icon}
							onclick={() => dispatch({ type: actions.closeApp, window: _wd })}>
							{/* close */}
						</Icon>
					</div>
				</div>
				<ul className={styles.menu}>
					<li>archivo</li>
					<li>editar</li>
					<li>ver</li>
					<li>ayuda</li>
				</ul>
				<div className={styles.container}>
					{
						<DynamicComponet
							width={_wd.size.w}
							height={_wd.size.h - 28}
							State={state["profiles"]}
							dispatch={Dispatch}
						/>
					}
				</div>
			</div>
		</Draggable>
	);
}

const data = [
	{
		name: "luis",
		groups: [
			{
				name: "group1",
				checkedRead: true,
				checkedWrite: false,
				checkedExecution: true
			},
			{
				name: "group2",
				checkedRead: true,
				checkedWrite: true,
				checkedExecution: false
			},
			{
				name: "group3",
				checkedRead: false,
				checkedWrite: false,
				checkedExecution: true
			}
		]
	},
	{
		name: "junior",
		groups: [
			{
				name: "group1",
				checkedRead: true,
				checkedWrite: true,
				checkedExecution: true
			}
		]
	},
	{
		name: "carlos",
		groups: [
			{
				name: "group1",
				checkedRead: false,
				checkedWrite: false,
				checkedExecution: false
			},
			{
				name: "group3",
				checkedRead: true,
				checkedWrite: false,
				checkedExecution: true
			}
		]
	}
];

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
