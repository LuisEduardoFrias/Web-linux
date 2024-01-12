/** @format */

"use client";

import Icon from "cp/icon";

export const enum ModalType {
	notification = 0,
	warning = 1,
	error = 2
}

interface INotificationCardProps {
	show: boolean;
	setShow?: (state: boolean) => void;
	type: ModalType;
	title: string;
	state?: any;
	dialog: string;
	onClick1?: (event: any) => void;
	onClick2?: (event: any) => void;
	onClick3?: (event: any) => void;
}

export default function CardNotification(props: INotificationCardProps) {
	const getClass: string =
		props.type === ModalType.warning
			? "modal-content-warning"
			: props.type === ModalType.notification
			? "modal-content-notification"
			: "modal-content-error";

	const _onClick = (event: any, click: any) => {
		if (click) click(event);
		if (props.setShow) props.setShow(false);
	};

	const _styles: React.CSSPriperties = {
		display: props.show ? "flex" : "none"
	};

	return (
		<div className='modal-windows' style={_styles}>
			<div className={`modal-content ${getClass}`}>
				<div className={"modal-header"}>
					{props.type === ModalType.warning ? (
						<Icon className='icon'>warning</Icon>
					) : props.type === ModalType.notification ? (
						<Icon className='icon'>circle_notifications</Icon>
					) : (
						<Icon className='icon'>error</Icon>
					)}

					<label className='title'>
						{props.type === ModalType.warning
							? "Warning"
							: props.type === ModalType.notification
							? "Notification"
							: "Error"}
					</label>
				</div>

				<div className='container-sub-title'>
					<label className='sub-title'>{props.title}</label>
					<label className='dialog'>{props.dialog}</label>
				</div>

				<div className='contaner-buttons'>
					{props.onClick1 ? (
						<button
							type='button'
							className='btn'
							onClick={event =>
								_onClick({ ...event, state: props.state }, props.onClick1)
							}>
							Aceptar
						</button>
					) : null}

					{props.onClick2 ? (
						<button
							type='button'
							className='btn'
							onClick={event =>
								_onClick({ ...event, state: props.state }, props.onClick2)
							}>
							Cancelar
						</button>
					) : null}

					{props.onClick3 ? (
						<button
							type='button'
							className='btn'
							onClick={event =>
								_onClick({ ...event, state: props.state }, props.onClick3)
							}>
							Okey
						</button>
					) : null}
				</div>
			</div>
		</div>
	);
}
