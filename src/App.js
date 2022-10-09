import React, { useEffect, useState } from 'react'
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import api from './api'
import Pagination from './components/pagination'
import { paginate } from './utils/paginate'
import GroupList from './components/groupList'

function App() {
	const [users, setUsers] = useState(api.users.fetchAll())
	const [currentPage, setCurrentPage] = useState(1)
	const [professions, setProfessions] = useState(api.professions.fetchAll())
	const [selectedProf, setSelectedProf] = useState()

	const pageSize = 4
	const filteredUsers = selectedProf
		? users.filter(
				(user) =>
					JSON.stringify(user.profession) === JSON.stringify(selectedProf) // из чата
		  )
		: users
	const count = filteredUsers.length
	const userCrop = paginate(filteredUsers, currentPage, pageSize)
	const handleDelete = (userId) => {
		setUsers(users.filter((user) => user._id !== userId))
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
	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex)
	}
	const handleProfessionSelect = (item) => {
		setSelectedProf(item)
	}
	const clearFilter = () => {
		setSelectedProf()
	}
	useEffect(() => {
		api.professions.fetchAll().then((data) => setProfessions(data))
	}, [])
	useEffect(() => {
		api.users.fetchAll().then((data) => setUsers(data))
	}, [])
	useEffect(() => {
		setCurrentPage(1)
	}, [selectedProf])
	return (
		<div className="d-flex">
			{professions && (
				<div className="d-flex flex-column flex-shrink-0 p-3">
					<GroupList
						selectedItem={selectedProf}
						items={professions}
						onItemSelect={handleProfessionSelect}
					/>
					<button className="btn btn-secondary mt-2" onClick={clearFilter}>
						Очистить
					</button>
				</div>
			)}
			<div className="d-flex flex-column">
				<SearchStatus length={count} />
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
				<div className="d-flex justify-content-center">
					<Pagination
						itemsCount={count}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
		</div>
	)
}

export default App
