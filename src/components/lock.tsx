/** @format */

"use client";

import Logo from "cp/logo";
import Input from "cp/input";
import Form from "cp/form";
import LdDualRing from "cp/ld_dual_ring";
//
import { useRef, createRef, useState } from "react";
import useSuperState from "hk/use_super_state";
import Reducer, { actions } from "hp/reducer";
import initialState from "hp/initial_state";
import { Dispatch } from "hk/use_all_state";
import styles from "st/lock.module.css";
import Middleware from "hp/middleware";

export default function Lock() {
	const [state, dispatch] = useSuperState(
		Reducer,
		initialState(),
		[],
		Middleware
	);

	const [credential, setCredential] = useState({ user: "root", password: "" });
	const [showLoader, setLoader] = useState(false);

	const passwordRef = useRef([null, null]);

	function handleSubmit(event: any) {
		event.preventDefault();
		setLoader(true);
		setTimeout(() => {
			dispatch({
				type: actions.unblock,
				user: credential.user,
				password: credential.password
			});
			setCredential({ user: "root", password: "" })
			setLoader(false);
		}, 1000);
	}

	function handleChange(event: any) {
		const name: string = event.target.name;

		setCredential(prev => {
			const clone: object = { ...prev };

			if (event.target.value === "") {
				if (name === "password") return { ...clone };
			}

			clone[name] = event.target.value;

			return { ...clone };
		});

		if (name === "password") {
			passwordRef.current[0].value = "";
		}
	}

	const _styles: React.CSSProperties = {
		display: "grid",
		gridTemplateColumns: "25px 1fr",
		gridTemplateRows: "25px",
		gridTemplateAreas: "'area-input area-input'"
	};

	return (
		<div className={styles.lock}>
			<LdDualRing show={showLoader} />
			<div className={styles.form_}>
				<Logo />
				<form onSubmit={handleSubmit}>
					<fieldset className='container register-form-group'>
						<div style={_styles} className='separator'>
							<label htmlFor={"user"} className='input-label'>
								User
							</label>
							<input
								className='input'
								autoComplete='off'
								defaultValue='root'
								name={"user"}
								id={"user"}
								onChange={handleChange}
							/>
						</div>
					</fieldset>
					<fieldset className='container register-form-group'>
						<div style={_styles} className='separator'>
							<label htmlFor={"password"} className='input-label'>
								Password
							</label>
							<input
								ref={ref => (passwordRef.current[0] = ref)}
								className='input'
								autoComplete='off'
								autocapitalize='none'
								name={"password"}
								id={"password"}
								onChange={handleChange}
							/>
						</div>
					</fieldset>

					<button>Log in</button>
				</form>
			</div>
		</div>
	);
}
