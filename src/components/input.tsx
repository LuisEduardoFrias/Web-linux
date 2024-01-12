/** @format */
"use client";

import React, { InputHTMLAttributes } from "react";
import Icon from "cp/icon";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	name: string;
	label: string;
	initValue: string;
	icon?: string;
	className?: string;
	children: ReactElement;
}

export default function Input(props: IInputProps): JSX.Element {
	const {
		id,
		name,
		label,
		initValue,
		icon,
		className,
		children,
		...inputProps
	} = props;

	const _styles: React.CSSProperties = {
		display: "grid",
		gridTemplateColumns: "25px 1fr",
		gridTemplateRows: "25px",
		gridTemplateAreas: icon
			? "'area-icon area-input'"
			: "'area-input area-input'"
	};

	return (
		<fieldset className={`container ${className ?? ""}`}>
			<div style={_styles} className={"separator"}>
				{icon && <Icon className='area-icon'>{icon}</Icon>}
				<label htmlFor={id} className={"input-label"}>
					{label}
				</label>
				<input {...inputProps} name={name} id={id} />
			</div>
			{children}
		</fieldset>
	);
}
