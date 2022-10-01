import React, { useState } from 'react'
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import api from './api'

function App() {
	const [users, setUsers] = useState(api.users.fetchAll())
	const handleDelete = (userId) => {
		setUsers((prevState) => prevState.filter((user) => user._id !== userId))
	}
	const handleToggleBookMark = (id) => {
		setUsers(
			users.map((user) => {
				if (user._id === id) {
					return { ...user, bookmark: !user.bookmark }
				} else {
					return user
				}
			})
		)
	}
	return (
		<div>
			<SearchStatus length={users.length} />
			<table className={users.length ? 'table' : 'hide'}>
				<thead>
					<tr>
						<th scope="col">Имя</th>
						<th scope="col">Качества</th>
						<th scope="col">Профессия</th>
						<th scope="col">Встретился, раз</th>
						<th scope="col">Оценка</th>
						<th scope="col">Избранное</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<Users
						users={users}
						handleDelete={handleDelete}
						handleToggleBookMark={handleToggleBookMark}
					/>
				</tbody>
			</table>
		</div>
	)
}

export default App
