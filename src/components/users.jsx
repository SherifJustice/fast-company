import React, { useState } from 'react'
import api from '../api'
import '../index.css'
const Users = () => {
	const [users, setUsers] = useState(api.users.fetchAll())
	const handleDelete = (userId) => {
		setUsers((prevState) => prevState.filter((user) => user._id !== userId))
	}
	const renderPhrase = (number) => {
		function numOfMet(number) {
			const lastOne = Number(number.toString().slice(-1))
			if (number > 4 && number < 15) return 'человек тусанет'
			if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека тусанут'
			if (lastOne === 1) return 'человек тусанет'
		}
		if (number > 0) {
			return (
				<h2>
					<span className={badge + 'primary'}>
						{users.length + ' '}
						{numOfMet(users.length)} с тобой сегодня
					</span>
				</h2>
			)
		} else {
			return (
				<h2>
					<span className={badge + 'danger'}>
						Никто не тусанет с тобой сегодня
					</span>
				</h2>
			)
		}
	}

	const badge = 'badge m-1 bg-'
	return (
		<>
			<>{renderPhrase(users.length)}</>
			<table className={users.length ? 'table' : 'hide'}>
				<thead>
					<tr>
						<th scope="col">Имя</th>
						<th scope="col">Качества</th>
						<th scope="col">Профессия</th>
						<th scope="col">Встретился, раз</th>
						<th scope="col">Оценка</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user._id}>
							<th scope="row">{user.name}</th>
							<td>
								{user.qualities.map((qualitie) => (
									<span className={badge + qualitie.color} key={qualitie._id}>
										{qualitie.name}
									</span>
								))}
							</td>
							<td>{user.profession.name}</td>
							<td>{user.completedMeetings}</td>
							<td>{user.rate}</td>
							<td>
								<button
									className="btn btn-danger"
									onClick={() => handleDelete(user._id)}
								>
									delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default Users
