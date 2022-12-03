import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'

const Users = () => {
	const params = useParams()
	const { userID } = params
	return <>{userID ? <UserPage userID={userID} /> : <UsersListPage />}</>
}

export default Users
