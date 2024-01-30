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
		overflow: "visible",
		backgroundImage: "url('/dragon.png')",
		backgroundSize: "cover",
		backgroundSize: "50%",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center"
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
								<Window key={i} wd={w} windowsFocus={desk_.windowFocus} setFocus={()=>{
	dispatch({ type: "setFocus", value: w, key: desk_.key});
}} />
							))}
						</div>
					);
			})}
		</>
	);
}
