import React from 'react'
import { useState } from 'react'

const SearchUser = ({ users }) => {
	const [search, setSearch] = useState('')

	const findedUser = users.filter((user) => {
		return user.name.toLowerCase().trim().includes(search.toLowerCase().trim())
	})

	return (
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
	)
}

export default SearchUser
