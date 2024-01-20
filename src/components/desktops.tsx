/** @format */

import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";

//Componente dek taskbar para cambiar entre desktop
export default function Decktops() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"taskbar",
		"desks"
	]);

	const { taskbar, desks } = state;

	const handleInputChange = (event: React.ChangeEvent) => {
		dispatch({ type: actions.changeDesktop, value: desks[event.target.value] });
	};

	const desktopOptiona: string[] = desks.map(e => e.name);

	return (
		<>
			{desktopOptiona.map((e: string, index: number) => (
				<label key={index} className='window'>
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
