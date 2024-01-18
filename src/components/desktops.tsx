/** @format */
import { getState, Dispatch } from "hk/use_all_state";
//import { actions } from "hp/reducer";
import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";

export default function Decktops() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"taskbar",
		"desks"
	]);

	const { taskbar, desks } = state;

	const handleInputChange = (event: React.ChangeEvent) => {
		taskbar.changeDesktop(desks[event.target.value]);
	};

	const desktopOptiona: string[] = desks.map(e => e.name);

	return (
		<>
			{desktopOptiona.map((e: string, index: number) => (
				<label className='window'>
					<input
						type='radio'
						name='window'
						value={index}
						checked={taskbar.desktop.name === e}
						onChange={handleInputChange}
					/>
					<span>{index + 1}</span>
				</label>
			))}
		</>
	);
}
