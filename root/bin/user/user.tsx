/** @format */
import { useState, useEffect } from "react";
import styles from "./files/user.module.css";
import Icon from "cp/icon";
import CreateUser from "./files/create_user";
import { Get } from "hp/fetch";

interface IProps {}

export default function User({ State, setWindowsState }: IProps) {
	const [data, setData] = useState(null);
	const [selectedRow, setSelectedRow] = useState(null);
	const [showCreate, setShowCreate] = useState(false);
	const [selectedGroups, setSelectedGroups] = useState({
		user: data[0].name,
		groups: data[0].groups
	});

	useEffect(() => {
		(async () => {
			setData(await Get("get_users"));
		})();
	}, []);

	function handleRowClick(rowData) {
		setSelectedRow(rowData);
		setSelectedGroups({ user: rowData.name, groups: rowData.groups });
	}

	function handleCheckClick(
		user: string,
		group: string,
		checkbox: string,
		isCheck: boolean
	) {
		setWindowsState(prev => {
			const _user = prev.data.filter((e: any) => e.name === user)[0];
			const _group = _user.groups.filter((e: any) => e.name === group)[0];

			_group[checkbox] = !isCheck;

			return { ...prev };
		});
	}

	return (
		<div className={styles.container}>
			{showCreate && (
				<CreateUser setShowCreate={setShowCreate} dispatch={dispatch} />
			)}
			<fieldset className={styles.section}>
				<legend>Access Control List</legend>
				<div>
					<table className={styles.tg}>
						<thead>
							<tr>
								<th className={styles.tgVqx1}></th>
								<th className={styles.tgVqx1}>Entry</th>
								<th className={styles.tgVqx1}>Read</th>
								<th className={styles.tgVqx1}>Write</th>
								<th className={styles.tgVqx1}>Execution</th>
								<th className={styles.tgVqx2}></th>
							</tr>
						</thead>
						<tbody>
							{selectedGroups.groups.map((row, index) => (
								<tr
									key={index}
									className={selectedRow === row ? styles.selectedRow : ""}
									onClick={() => handleRowClick(row)}>
									<td className={styles.tg8jgo}>
										<Icon>person</Icon>
									</td>
									<td className={styles.tg8jgo}>{row.name}</td>
									<td className={styles.tg8jgo}>
										<input
											type='checkbox'
											tabindex='20'
											name='edad'
											checked={row.checkedRead}
											value='20-39'
											onClick={() =>
												handleCheckClick(
													selectedGroups.user,
													row.name,
													"checkedRead",
													row.checkedRead
												)
											}
										/>
									</td>
									<td className={styles.tg8jgo}>
										<input
											type='checkbox'
											tabindex='20'
											checked={row.checkedWrite}
											name='edad'
											value='20-39'
											onClick={() =>
												handleCheckClick(
													selectedGroups.user,
													row.name,
													"checkedWrite",
													row.checkedWrite
												)
											}
											bdhd
										/>
									</td>
									<td className={styles.tg8jgo}>
										<input
											type='checkbox'
											tabindex='20'
											checked={row.checkedExecution}
											name='edad'
											value='20-39'
											onClick={() =>
												handleCheckClick(
													selectedGroups.user,
													row.name,
													"checkedExecution",
													row.checkedExecution
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
					<table className={styles.tg}>
						<thead>
							<tr>
								<th className={styles.tgVqx1}></th>
								<th className={styles.tgVqx1}>Participant</th>
								<th className={styles.tgVqx2}></th>
							</tr>
						</thead>
						<tbody>
							{data.map((row, index) => (
								<tr
									key={index}
									className={selectedRow === row ? styles.selectedRow : ""}
									onClick={() => handleRowClick(row)}>
									<td className={styles.tg8jgo}>
										<Icon>person</Icon>
									</td>
									<td className={styles.tg8jgo}>{row.name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</fieldset>
		</div>
	);
}
