import React from 'react'
import User from './user'
import PropTypes from 'prop-types'
const Users = ({ users, handleDelete, handleToggleBookMark }) => {
	return users.map((user) => (
		<tr key={user._id}>
			<td>{user.name}</td>
			<User user={user} handleToggleBookMark={handleToggleBookMark} />
			<td>
				<button
					className="btn btn-danger"
					onClick={() => handleDelete(user._id)}
				>
					delete
				</button>
			</td>
		</tr>
	))
}

Users.propTypes = {
	users: PropTypes.array.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleToggleBookMark: PropTypes.func.isRequired,
}

export default Users
