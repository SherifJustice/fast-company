import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { paginate } from '../../../utils/paginate'
import Pagination from '../../common/pagination'
import api from '../../../api'
import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UserTable from '../../ui/usersTable'
import _ from 'lodash'
const UsersListPage = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [professions, setProfession] = useState()
	const [selectedProf, setSelectedProf] = useState()
	const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
	const [searchQuery, setSearchQuery] = useState('')
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
	}, [selectedProf, searchQuery])

	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex)
	}
	const handleSort = (item) => {
		setSortBy(item)
	}

	const handleProfessionSelect = (item) => {
		setSelectedProf(item)
		setSearchQuery('')
	}

	const handleSearch = (e) => {
		if (e.target.value) {
			setSearchQuery(e.target.value)
			setSelectedProf('')
		} else {
			setSearchQuery('')
		}
	}
	if (users) {
		const filteredOrSearchedUsers = selectedProf
			? users.filter(
					(user) =>
						JSON.stringify(user.profession) === JSON.stringify(selectedProf)
			  )
			: searchQuery
			? users.filter((user) =>
					user.name
						.toLowerCase()
						.trim()
						.includes(searchQuery.toLowerCase().trim())
			  )
			: users

		const sortedUsers = _.orderBy(
			filteredOrSearchedUsers,
			[sortBy.path],
			[sortBy.order]
		)

		const count = filteredOrSearchedUsers.length
		const usersCrop = paginate(sortedUsers, currentPage, pageSize)

		const clearFilter = () => {
			setSelectedProf('')
			setSearchQuery('')
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
					<div>
						<form>
							<input
								type="text"
								placeholder="Search..."
								name="searchQuery"
								className="search__input w-100 mx-auto"
								onChange={(e) => handleSearch(e)}
								value={searchQuery}
							/>
						</form>
					</div>
					{count > 0 && (
						<UserTable
							selectedSort={sortBy}
							users={usersCrop}
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
UsersListPage.propTypes = {
	users: PropTypes.array,
}

export default UsersListPage
