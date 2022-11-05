import React, { useState, useEffect } from 'react'
import api from '../api'
import Quality from './quality'

const UserPage = ({ match, history }) => {
	const userID = match.params.userID
	const [user, setUser] = useState()
	useEffect(() => {
		api.users.getById(userID).then((data) => setUser(data))
	})
	const hadleAllUsers = () => {
		history.push('/users')
	}
	return (
		<>
			{user ? (
				<ul>
					<h1>{user.name}</h1>
					<h2>Профессия:{user.profession.name}</h2>
					<>
						{user.qualities.map((qual) => (
							<Quality {...qual} key={qual._id} />
						))}
					</>
					<p>CompletedMeetings:{user.completedMeetings}</p>
					<h1>Rate:{user.rate}</h1>
					<button
						className="btn btn-secondary mt-2"
						onClick={() => {
							hadleAllUsers()
						}}
					>
						Все пользователи
					</button>
				</ul>
			) : (
				<h1>Loading</h1>
			)}
		</>
	)
}

export default UserPage
