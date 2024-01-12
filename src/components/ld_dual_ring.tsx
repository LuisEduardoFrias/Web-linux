/** @format */

interface ILdDualRing {
	show: boolean;
	width?: number;
	height?: number;
	x?: number;
	y?: number;
}

export default function LdDualRing({ show, width, height, x, y }: ILdDualRing) {
	const _styles = {
		width: `${width && 200}px`,
		height: `${height && 200}px`,
		left: `${x && 0}px`,
		top: `${y && 0}px`,
		borderRadius: "0 0 3px 3px"
	};

	return (
		<>
			{show && (
				<div className='modal-loading' style={_styles}>
					<div className='ldDualRing'></div>
				</div>
			)}
		</>
	);
}
