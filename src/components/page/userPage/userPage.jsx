/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../../api'
import Qualities from '../../ui/qualities'

const UserPage = ({ userID }) => {
	const router = useHistory()
	const [user, setUser] = useState()
	useEffect(() => {
		api.users.getById(userID).then((data) => setUser(data))
	}, [])
	const handleChEditUser = () => {
		router.push(`/users/${userID}/edit`)
	}
	if (user) {
		return (
			<div>
				<h1>{user.name}</h1>
				<h2>Профессия: {user.profession.name}</h2>
				<Qualities qualities={user.qualities} />
				<p>CompletedMeetings:{user.completedMeetings}</p>
				<h1>Rate:{user.rate}</h1>
				<button
					className="btn btn-secondary mt-2"
					onClick={() => {
						handleChEditUser()
					}}
				>
					Изменить
				</button>
			</div>
		)
	} else {
		return <h1>Loading</h1>
	}
}

UserPage.propTypes = {
	userID: PropTypes.string.isRequired,
}

export default UserPage
