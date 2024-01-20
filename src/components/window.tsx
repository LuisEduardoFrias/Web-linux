/** @format */

"use client";
import React from "react";
import Draggable from "react-draggable";
import dynamic from "next/dynamic";
import LdDualRing from "./ld_dual_ring";
import Icon from "./icon";
import Wd, { WindowState } from "md/window";
import File from "md/file";
import Folder from "md/folder";
import FileFolder from "./file_folder";
import useSize from "hk/use_size";

import styles from "st/window.module.css";

import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";

interface IWindowpProps {
	wd: Wd;
	deskW: number;
	deskH: number;
}

export default function Window({ wd: wd, deskH, deskW }: IWindowpProps) {
	const [state, dispatch] = useSuperState(Reducer, initialState(), []);

	const size = useSize();

	wd.size.width = wd.state === WindowState.normal ? wd.size.width : deskW;
	wd.size.height = wd.state === WindowState.normal ? wd.size.height : deskH;
	wd.point.x = wd.state === WindowState.normal ? wd.point.x : 0;
	wd.point.y = wd.state === WindowState.normal ? wd.point.y : 0;

	/*	let DynamicComponet: any;
  	if (!wd.isFolder) {
  		DynamicComponet = dynamic(() => import(`../${wd.url}`), {
  			ssr: false,
  			loading: () => (
  				<LdDualRing
  					width={wd.size.w}
  					height={wd.size.h - 30}
  					x={wd.point.x + 1}
  					y={wd.point.y + 30}
  					show={true}
  				/>
  			)
  		});
  	}
*/
	function handleNormal() {
		if (wd.state == WindowState.maximum) {
			dispatch({
				type: actions.normalApp,
				window: {
					...wd,
					size: { w: 200, h: 100 },
					point: { x: 50, y: 59 },
					state: 1
				}
			});
		} else if (wd.state == WindowState.normal) {
			dispatch({
				type: actions.normalApp,
				window: {
					...wd,
					size: { w: deskW, h: deskH },
					point: { x: 0, y: 0 },
					state: 2
				}
			});
		}
	}

	const _style = {
		width: `${wd.size.w}px`,
		height: `${wd.size.h}px`,
		left: `${wd.point.x}px`,
		top: `${wd.point.y}px`
	};

	const fileFolders: (File | Foler)[] = [];

	if (wd.files) fileFolders.push(...wd.files);

	if (wd.folders) fileFolders.push(...wd.folders);

	// "./Rodeados.mp3"
	/*	const filedata = dynamic(
  		() => import(`../root/home/luiseduardofrias/pn.tsx`),
  		{
  			ssr: false,
  			loading: () => (
  				<LdDualRing
  					width={wd.size.w}
  					height={wd.size.h - 30}
  					x={wd.point.x + 1}
  					y={wd.point.y + 30}
  					show={true}
  				/>
  			)
  		}
  	);
*/

	return (
		<Draggable
			axis='both'
			handle='.handle'
			bounds={{ left: -1000, top: 0, right: 1000, bottom: 1000 }}
			disabled={false}
			//	grid={[25, 25]}
			//	defaultPosition={{ x: 0, y: 0 }}
			//	position={null}
			//scale={1}
			//								onStart={this.handleStart}
			//								onDrag={this.handleDrag}
			//								onStop={this.handleStop}
		>
			<div className={styles.window} style={_style}>
				<div className={`handle ${styles.bar}`}>
					<span>{wd.title}</span>
					<div className={styles.contro_size}>
						<Icon className={styles.icon}>close_fullscreen</Icon>
						<Icon className={styles.icon} onclick={handleNormal}>
							{wd.state == WindowState.maximum
								? "fullscreen_exit"
								: "fullscreen"}
						</Icon>
						<Icon
							className={styles.icon}
							onclick={() => dispatch({ type: actions.closeApp, window: wd })}>
							close
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
					{/*
						!wd.isFolder ? (
						<DynamicComponet
							//data={{ path_video_audio: filedata }}
							width={wd.size.w}
							height={wd.size.h - 28}
						/>
					) : (
						<div className={styles.containerFile}>
							{fileFolders?.map((obj: File | Folder, inde: number) => (
								<FileFolder key={inde} obj={obj} url={wd.url} />
							))}
						</div>
					) */}
				</div>
			</div>
		</Draggable>
	);
}

/*


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
