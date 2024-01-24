/** @format */
import { useState, useEffect } from "react";
import styles from "./files/user.module.css";
import Icon from "cp/icon";
import CreateUser from "./files/create_user";
import { Get } from "hp/fetch";

interface IProps {}

export default function User({ State, setWindowsState }: IProps) {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [showCreate, setShowCreate] = useState(false);

	useEffect(() => {
		(async () => {
			const { data } = await Get("get_users");
			setUsers(data);
		})();
	}, []);

	function handleRowClick(user) {
		setSelectedUser(user);
	}

	function handleCheckClick(
		group: string,
		checkbox: string,
		isCheck: boolean
	) {}

	const groups = [
		{
			name: "Groups 1",
			name: "Groups 1",
			checkedRead: true,
			checkedWrite: false,
			checkedExecution: true
		},
		{
			name: "Groups 2",
			checkedRead: true,
			checkedWrite: false,
			checkedExecution: false
		}
	];

	return (
		<div className={styles.container}>
			{showCreate && <CreateUser setShowCreate={setShowCreate} />}
			<fieldset className={styles.section}>
				<legend>Access Control List</legend>
				<div>
					<table className={styles.table}>
						<thead>
							<tr className={styles.thead}>
								<th className={`${styles.th} ${styles.first_th}`}></th>
								<th className={styles.th}>Entry</th>
								<th className={styles.th}>Read</th>
								<th className={styles.th}>Write</th>
								<th className={styles.th}>Execution</th>
								<th className={`${styles.th} ${styles.last_th}`}></th>
							</tr>
						</thead>
						<tbody>
							{groups?.map((group: object, index: number) => (
								<tr
									key={index}
									onClick={() => handleRowClick(group)}
									className={styles.trow}>
									<td className={styles.tr}>
										<Icon>person</Icon>
									</td>
									<td className={styles.tr}>{group.name}</td>
									<td className={styles.tr}>
										<input
											type='checkbox'
											tabindex='20'
											name='edad'
											checked={group.checkedRead}
											value='20-39'
											onClick={() =>
												handleCheckClick(
													group.name,
													"checkedRead",
													group.checkedRead
												)
											}
										/>
									</td>
									<td className={styles.tr}>
										<input
											type='checkbox'
											tabindex='20'
											checked={group.checkedWrite}
											name='edad'
											value='20-39'
											onClick={() =>
												handleCheckClick(
													group.name,
													"checkedWrite",
													group.checkedWrite
												)
											}
											bdhd
										/>
									</td>
									<td className={styles.tr}>
										<input
											type='checkbox'
											tabindex='20'
											checked={group.checkedExecution}
											name='edad'
											value='20-39'
											onClick={() =>
												handleCheckClick(
													group.name,
													"checkedExecution",
													group.checkedExecution
												)
											}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</fieldset>
			<fieldset className={styles.section}>
				<legend>Participants List</legend>

				<div className={styles.controlers}>
					<div className={styles.filterButton}>
						<div className={styles.filter}>
							<input placeholder='Filter' />
							<Icon>search</Icon>
						</div>
						<button
							onClick={() => {
								setShowCreate(true);
							}}>
							Add
							<Icon>person_add</Icon>
						</button>
						<button>
							remove
							<Icon>delete</Icon>
						</button>
					</div>
				</div>
				<div>
					<table className={styles.table}>
						<thead>
							<tr className={styles.theader}>
								<th className={`${styles.th} ${styles.first_th}`}></th>
								<th className={styles.th}>Participant</th>
								<th className={`${styles.th} ${styles.last_th}`}></th>
							</tr>
						</thead>
						<tbody>
							{users?.map((user, index) => (
								<tr
									key={index}
									className={`${styles.trow} ${
										selectedUser === user ? styles.selectedUser : ""
									}`}
									onClick={() => handleRowClick(user)}>
									<td className={styles.tr}>
										<Icon>person</Icon>
									</td>
									<td className={styles.tr}>{user.userName}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</fieldset>
		</div>
	);
}
