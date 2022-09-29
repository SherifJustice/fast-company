import React from 'react'
import Qualitie from './qualitie'
import BookMark from './bookmark'
const User = ({ user, handleToggleBookMark }) => {
	return (
		<>
			<td>
				{user.qualities.map((qualitie) => (
					<Qualitie
						color={qualitie.color}
						name={qualitie.name}
						_id={qualitie._id}
					/>
				))}
			</td>
			<td>{user.profession.name}</td>
			<td>{user.completedMeetings}</td>
			<td>{user.rate}</td>
			<td>
				<BookMark
					status={user.bookmark}
					handleToggleBookMark={handleToggleBookMark}
				/>
			</td>
		</>
	)
}

export default User
