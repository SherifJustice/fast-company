import React, { useState } from 'react'
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import api from './api'
import Pagination from './components/pagination'
import { paginate } from './utils/paginate'

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
	const count = users.length
	const pageSize = 4
	const [currentPage, setCurrentPage] = useState(1)
	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex)
	}
	const userCrop = paginate(users, currentPage, pageSize)

	return (
		<div>
			<SearchStatus length={users.length} />
			<table className={count ? 'table' : 'hide'}>
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
						users={userCrop}
						handleDelete={handleDelete}
						handleToggleBookMark={handleToggleBookMark}
					/>
				</tbody>
			</table>
			<Pagination
				itemsCount={count}
				pageSize={pageSize}
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
		</div>
	)
}

export default App
