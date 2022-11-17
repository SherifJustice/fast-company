import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/userPage'
import UsersList from '../components/usersList'

const Users = () => {
	const params = useParams()
	const { userID } = params
	return <>{userID ? <UserPage userID={userID} /> : <UsersList />}</>
}

export default Users
