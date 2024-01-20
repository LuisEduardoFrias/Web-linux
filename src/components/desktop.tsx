/** @format */

import Draggable from "react-draggable";
import Dk from "md/desk";
import Wd from "md/window";
import Window from "cp/window";
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

	return (
		<>
			{desks.map((desk_: Dk, index: number) => {
				if (desk_.key === taskbar.desktop.key)
					return (
						<div key={index} className={styles.desk}>
							<Draggable
							//	axis='x'
							  	handle='.handle'
							//	defaultPosition={{ x: 0, y: 0 }}
							//	position={null}
							//	grid={[25, 25]}
							//scale={1}
							//								onStart={this.handleStart}
							//								onDrag={this.handleDrag}
							//								onStop={this.handleStop}
							>
								<div
									style={{
										border: "1px solid red",
										width: "150px"
									}}>
									<div
										style={{
											width: "150px",
											height: "25px",
											backgroundColor: "red"
										}}
										className='handle'>
										Drag from here
									</div>
									<div
										style={{
											width: "150px",
											height: "150px",
											backgroundColor: "white"
										}}>
										This readme is really dragging on...
									</div>
								</div>
							</Draggable>
							<Draggable
							//	axis='x'
							  	handle='.handle'
							//	defaultPosition={{ x: 0, y: 0 }}
							//	position={null}
							//	grid={[25, 25]}
							//scale={1}
							//								onStart={this.handleStart}
							//								onDrag={this.handleDrag}
							//								onStop={this.handleStop}
							>
								<div
									style={{
										border: "1px solid blue",
										width: "150px"
									}}>
									<div
										style={{
											width: "150px",
											height: "25px",
											backgroundColor: "blue"
										}}
										className='handle'>
										Drag from here
									</div>
									<div
										style={{
											width: "150px",
											height: "150px",
											backgroundColor: "white"
										}}>
										This readme is really dragging on...
									</div>
								</div>
							</Draggable>
							{/*
							(desk_.fileFolders.map((obj: File | Folder, inde: number) => (
								<FileFolder key={inde} obj={obj} />
							)) */}
							{desk_.openWindows?.map((w: Wd, i: number) => (
								<Window
									key={i}
									wd={w}
									window={w}
									deskW={size.width}
									deskH={size.height - taskbar.size.h}
								/>
							))}
						</div>
					);
			})}
		</>
	);
}
