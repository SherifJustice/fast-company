import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
// import SearchUser from './searchUser'

const TableBody = ({ data, columns, search }) => {
	// const [search, setSearch] = useState('')

	// const findedUser  = data.filter((user) => {
	// 	return user.name.toLowerCase().trim().includes(search.toLowerCase().trim())
	// })
	const renderContent = (item, column) => {
		if (columns[column].component) {
			const component = columns[column].component
			if (typeof component === 'function') {
				return component(item)
			}

			return component
		}
		return _.get(item, columns[column].path)
	}
	return (
		<>
			{/* <div className="form">
				<form className="search__form">
					<input
						type="text"
						placeholder="Search..."
						className="search__input w-100 mx-auto"
						onChange={(event) => setSearch(event.target.value)}
					/>
				</form>
			</div> */}
			<tbody>
				{data.map((item) => (
					<tr key={item._id}>
						{Object.keys(columns).map((column) => (
							<td key={column}>{renderContent(item, column)}</td>
						))}
					</tr>
				))}
			</tbody>
		</>
	)
}

TableBody.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.object.isRequired,
}

export default TableBody
