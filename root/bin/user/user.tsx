/** @format */
import styles from "./files/user.module.css";
import Icon from "cp/icon";

export default function User() {
	return (
		<div className={styles.container}>
			<fieldset className={styles.aside}>
				<legend>Access Control List</legend>
				<div>
					<table class='tg'>
						<thead>
							<tr>
								<th class='tg-vqx1'></th>
								<th class='tg-vqx1'>Entry</th>
								<th class='tg-vqx1'>Read</th>
								<th class='tg-vqx1'>Write</th>
								<th class='tg-vqx1'>Execution</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class='tg-8jgo'>
									<Icon>person</Icon>
								</td>
								<td class='tg-8jgo'>name</td>
								<td class='tg-8jgo'>
									<input
										type='checkbox'
										tabindex='20'
										name='edad'
										value='20-39'
									/>
								</td>
								<td class='tg-8jgo'>
									<input
										type='checkbox'
										tabindex='20'
										name='edad'
										value='20-39'
									/>
								</td>
								<td class='tg-8jgo'>
									<input
										type='checkbox'
										tabindex='20'
										name='edad'
										value='20-39'
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</fieldset>
			<fieldset className={styles.main}>
				<legend>Participants List</legend>
				<div>
					<div>
						<label htmlFor='user'>User</label>
						<input type='radio' id='user' value='user' />
						<label htmlFor='group'>Group</label>
						<input type='radio' id='group' value='group' />
					</div>
					<div>
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
					<table class='tg'>
						<thead>
							<tr>
								<th class='tg-vqx1'></th>
								<th class='tg-vqx1'>Participant</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class='tg-8jgo'>
									<Icon>person</Icon>
								</td>
								<td class='tg-8jgo'>name</td>
							</tr>
						</tbody>
					</table>
				</div>
			</fieldset>
		</div>
	);
}
