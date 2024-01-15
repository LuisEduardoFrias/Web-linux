export default function Reducer(state: any, action: any) {
	const _action = {
		up_age: () => {
			return { ...state, age: action.value };
		},
		change_color: () => {
			return { ...state, color: action.value };
		},
		change_volume: () => {
			return { ...state, volume: action.value };
		},
		change_name: () => {
			return { ...state, name: action.value };
		}
	};

	return _action[action.type]();
}