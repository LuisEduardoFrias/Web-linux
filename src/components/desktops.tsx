/** @format */
import { getState, Dispatch } from "hk/use_all_state";
import { actions } from "hp/reducer";

export default function Decktops() {
	const { taskbar, desks } = getState();

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
