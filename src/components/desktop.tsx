/** @format */

import React, { useMemo } from "react";

import Dk from "md/desk";
import Wd from "md/window";

import Window from "cp/window";
import FileFolder from "cp/file_folder";

import useSuperState, { Equal } from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";
import useSize from "hk/use_size";
import styles from "st/core.module.css";

export default function Desktop(): React.ReactNode {
	const [state, dispatch] = useSuperState(
		Reducer,
		initialState(),
		//["taskbar", "desks"]
		
		(prev: any, state: any, prop: string | null) => {
			if (prop === "desks") {
				return true; //!Equal(prev, state["desks"]);
			} else if (prop === "taskbar") {
				return !state["taskbar"].desktop.key === prev.desktop.key;
			}
			return ["taskbar", "desks"];
		}
		
	);

	alert("'xzzzz");
	const size = useSize();

	//	const { desks, taskbar } = state;
	const desks = [];

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
				if (desk_.keys === taskbar.desktop.keys)
					return (
						<div key={index} style={_styles}>
							<ShowFileFolder fF={desk_.fileFolders} />
							<OpenWindows opW={desk_.openWindows} wf={desk_.windowFocus} />
						</div>
					);
			})}
		</>
	);
}

function ShowFileFolder({ fF }: { fF: (File | Folder)[] }): React.ReactNode {
	//
	function MemoFileFolder({
		index,
		obj
	}: {
		index: number;
		obj: File | Folder;
	}): React.Element {
		//
		return useMemo(() => <FileFolder key={index} obj={obj} />, [obj]);
	}

	return (
		<>
			{fF.map((obj: File | Folder, index: number) => (
				<MemoFileFolder key={index} index={index} obj={obj} />
			))}
		</>
	);
}

function OpenWindows({ opW, wf }: { opW: Wd[]; wf: string }): React.ReactNode {
	//
	function MemoWindow({
		index,
		wd,
		haveFocus
	}: {
		index: number;
		wd: Wd;
		haveFocus: boolean;
	}): any {
		const MemoElement = <Window key={index} wd={wd} haveFocus={haveFocus} />;

		return <>{MemoElement}</>;
	}

	const areEqual = (prevProps: any, nextProps: any) => {
		return (
			//prevProps.wd.state === nextProps.wd.state &&
			prevProps.haveFocus === nextProps.haveFocus
		);
	};

	const MemoizedWindow = React.memo(MemoWindow, areEqual);

	return (
		<>
			{opW.map((w: Wd, index: number) => (
				<MemoWindow key={index} index={index} wd={w} haveFocus={wf === w.key} />
			))}
		</>
	);
}
