/** @format */
import { useState, useEffect } from "react";
import Input from "cp/input";
import Form from "cp/form";
import Icon from "cp/icon";
import LdDualRing from "cp/ld_dual_ring";
import styles from "./create_user.module.css";
import { Post } from "hp/fetch";

interface IProps {
	setShowCreate: (value: boolean) => void;
}

export default function CreateUser(props: IProps) {
	const init: object = { name: "", userName: "", password: "" };

	const [loader, setLoader] = useState(false);
	const [data, setData] = useState(init);

	useEffect(() => {}, [data]);

	function handleSubmit(event: any) {
		event.preventDefault();
		setLoader(true);

		if (data.name !== "" && data.userName !== "" && data.password !== "")
			setTimeout(() => {
				(async () => {
					await Post("create_user", { ...data });
				})();

				setData(init);
				setLoader(false);
				props.setShowCreate(false);
			}, 1000);
	}

	function handleChange(event: any) {
		const name: string = event.target.name;

		setData(prev => {
			const clone: object = { ...prev };

			clone[name] = event.target.value;

			return { ...clone };
		});
	}

	return (
		<div className={styles.container}>
			<div className={styles.context}>
				<button
					className={styles.close}
					onClick={() => {
						props.setShowCreate(false);
					}}>
					<Icon>close</Icon>
				</button>
				<LdDualRing show={loader} />
				<form onSubmit={handleSubmit} className={styles.form}>
					<fieldset className='container register-form-group'>
						<div className='separator'>
							<label htmlFor={"name"} className='input-label'>
								Name
							</label>
							<input
								className='input'
								autoComplete='off'
								name={"name"}
								id={"name"}
								value={data.name}
								onChange={handleChange}
							/>
						</div>
					</fieldset>

					<fieldset className='container register-form-group'>
						<div className='separator'>
							<label htmlFor={"userName"} className='input-label'>
								User Name
							</label>
							<input
								className='input'
								autoComplete='off'
								name={"userName"}
								id={"userName"}
								value={data.userName}
								onChange={handleChange}
							/>
						</div>
					</fieldset>

					<fieldset className='container register-form-group'>
						<div className='separator'>
							<label htmlFor={"password"} className='input-label'>
								Password
							</label>
							<input
								className='input'
								autoComplete='off'
								type={"password"}
								name={"password"}
								id={"password"}
								value={data.password}
								onChange={handleChange}
							/>
						</div>
					</fieldset>
					<button>register</button>
				</form>
			</div>
		</div>
	);
}
