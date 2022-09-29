import React from 'react'
import User from './user'
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

export default Users
