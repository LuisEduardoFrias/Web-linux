/** @format */

"use client";

import Logo from "cp/logo";
import Input from "cp/input";
import Form from "cp/form";
//
import { actions } from "hp/reducer";
import { Dispatch } from "hk/use_all_state";
import styles from "st/lock.module.css";

export default function Lock() {
	function handleSubmit(
		data: object[],
		setLoader: (show: boolean) => void
	): boolean {
		setTimeout(() => {
			Dispatch({
				type: actions.unblock,
				user: data.user,
				password: data.password
			});
			setLoader(false);
		}, 1000);
	}

	return (
		<div className={styles.lock}>
			<Form onSubmit={handleSubmit}>
				<Logo />
				<Input
					id='user'
					name='user'
					autoComplete='off'
					type='text'
					placeholder='user'
					defaultValue='luisef'
					label='User'
					className='register-form-group'>
					<span required htmlFor='user'>
						'Campo requerido'
					</span>
				</Input>
				<Input
					id='password'
					name='password'
					autoComplete='off'
					type='password'
					defaultValue='123456'
					placeholder='password'
					label='Password'
					required_text='Campo requerido'
					className='register-form-group'
				>
					<span required htmlFor='password'>
						'Campo requerido'
					</span>
				</Input>
				<button>Log in</button>
			</Form>
		</div>
	);
}
