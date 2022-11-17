import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import api from '../api'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UserTable from './usersTable'
import _ from 'lodash'
// import SearchUser from './searchUser'
const UsersList = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [professions, setProfession] = useState()
	const [selectedProf, setSelectedProf] = useState()
	const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
	const [search, setSearch] = useState('')
	const pageSize = 6

	const [users, setUsers] = useState()
	useEffect(() => {
		api.users.fetchAll().then((data) => setUsers(data))
	}, [])
	const handleDelete = (userId) => {
		setUsers(users.filter((user) => user._id !== userId))
	}
	const handleToggleBookMark = (id) => {
		setUsers(
			users.map((user) => {
				if (user._id === id) {
					return { ...user, bookmark: !user.bookmark }
				}
				return user
			})
		)
		console.log(id)
	}

	useEffect(() => {
		api.professions.fetchAll().then((data) => setProfession(data))
	}, [])
	useEffect(() => {
		setCurrentPage(1)
	}, [selectedProf])

	const handleProfessionSelect = (item) => {
		setSelectedProf(item)
	}

	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex)
	}
	const handleSort = (item) => {
		setSortBy(item)
	}
	if (users) {
		const filteredUsers = selectedProf
			? users.filter(
					(user) =>
						JSON.stringify(user.profession) === JSON.stringify(selectedProf)
			  )
			: users

		const findedUser = users.filter((user) => {
			return user.name.toLowerCase().includes(search.toLowerCase())
		})
		const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

		const count = filteredUsers.length
		const usersCrop = paginate(sortedUsers, currentPage, pageSize)
		const clearFilter = () => {
			setSelectedProf()
		}

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
							{' '}
							Очистить
						</button>
					</div>
				)}
				<div className="d-flex flex-column">
					<SearchStatus length={count} />
					<div className="form">
						<form className="search__form">
							<input
								type="text"
								placeholder="Search..."
								className="search__input w-100 mx-auto"
								onChange={(event) => setSearch(event.target.value)}
							/>
						</form>
					</div>
					{count > 0 && (
						<UserTable
							selectedSort={sortBy}
							users={usersCrop}
							search={findedUser}
							onSort={handleSort}
							onDelete={handleDelete}
							onToggleBookMark={handleToggleBookMark}
						/>
					)}
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
	return 'loading...'
}
UsersList.propTypes = {
	users: PropTypes.array,
}

export default UsersList
