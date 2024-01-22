/** @format */
import { useState } from "react";
import styles from "./files/user.module.css";
import Icon from "cp/icon";

interface IProps {
	windowState: any;
	setWindowsState: any;
}

export default function User({ windowState, setWindowsState }: IProps) {
	const [selectedRow, setSelectedRow] = useState(null);
	const { data, group } = windowState;

	function handleRowClick(rowData) {
		setSelectedRow(rowData);
		// Aquí puedes disparar el evento con los datos de la fila (rowData)
	}

	function handleCheckClick(check: string, name: string, isCheck: boolean) {
		setWindowsState(prev => {
			const select = prev.group.filter((e: any) => e.name === name)[0];
			select[check] = !isCheck;

			return { ...prev };
		});
	}

	return (
		<div className={styles.container}>
			<fieldset className={styles.aside}>
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
							{group.map((row, index) => (
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
													"checkedRead",
													row.name,
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
													"checkedWrite",
													row.name,
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
													"checkedExecution",
													row.name,
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
			<fieldset className={styles.main}>
				<legend>Participants List</legend>

				<div className={styles.controlers}>
					<div className={styles.selectType}>
						<label htmlFor='user'>User</label>
						<input
							type='radio'
							checked
							name='seletType'
							id='user'
							value='user'
						/>
						<label htmlFor='group'>Group</label>
						<input type='radio' name='seletType' id='group' value='group' />
					</div>
					<div className={styles.filterButton}>
						<div>
							<input placeholder='Filter' />
							<Icon>search</Icon>
						</div>
						<button>
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
