/** @format */

import Dk from "md/desk";
import Wd from "md/window";
import Window from "cp/window";
import FileFolder from "cp/file_folder";
import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";
import useSize from "hk/use_size";
import styles from "st/core.module.css";

export default function Desktop() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"desks",
		"taskbar"
	]);

	const size = useSize();

	const { desks, taskbar } = state;

	const _styles: React.CSSProperties = {
		width: "100%",
		height: `${size.height - 30}px`,
		border: "0px solid green",
		position: "relative",
		boxSizing: "border-box",
		backgroundColor: "transparent", //"#ff000084",
		overflow: "hidden",
		backgroundImage: "url('/dragon.png')",
		backgroundSize: "cover",
		backgroundSize: "50%",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		border: "0px solid red"
	};

	return (
		<>
			{desks.map((desk_: Dk, index: number) => {
				if (desk_.key === taskbar.desktop.key)
					return (
						<div key={index} style={_styles}>
							{desk_.fileFolders.map((obj: File | Folder, inde: number) => (
								<FileFolder key={inde} obj={obj} />
							))}

							{desk_.openWindows?.map((w: Wd, i: number) => (
								<Window
									key={i}
									wd={w}
									windowsFocus={desk_.windowFocus}
									setFocus={() => {
										dispatch({ type: "setFocus", value: w, key: desk_.key });
									}}
								/>
							))}
						</div>
					);
			})}
		</>
	);
}

import React, { useRef, useEffect } from "react";

const DraggableWindow = () => {
	const windowRef = useRef(null);
	const barRef = useRef(null);

	useEffect(() => {
		windowRef.addEventListener("dragstart", event => {
			alert("start");
			//    	event.dataTransfer.setData("text/plain", "This text may be dragged")
		});
		windowRef.addEventListener("dragend", event => {
			alert("end");
			//event.dataTransfer.setData("text/plain", "This text may be dragged")
		});
		windowRef.addEventListener("drag", event => {
			alert("drag");
			//	event.dataTransfer.setData("text/plain", "This text may be dragged")
		});
	}, []);

	return (
		<div
			ref={windowRef}
			className='window'
			style={{
				width: "200px",
				height: "150px",
				backgroundColor: "red",
				border: "1px solid black"
			}}
			draggable='true'>
			<div
				ref={barRef}
				className='bar'
				style={{
					width: "100%",
					height: "30px",
					cursor: "move",
					backgroundColor: "lightgray"
				}}>
				Drag me!
			</div>
		</div>
	);
};
