import React from 'react'
import NavBar from '../components/ui/navBar'
import Users from '../layouts/users'
import { Redirect, Route, Switch } from 'react-router-dom'
import Main from '../layouts/main'
import Login from '../layouts/login'
import EditUserPage from '../components/page/editUserPage/editUserPage'

function App() {
	return (
		<div>
			<NavBar />
			<Switch>
				<Route exact path="/" component={Main} />
				<Route path="/login:type?" component={Login} />
				<Route exact path="/users/:userID?" component={Users} />
				<Route exact path="/users/:userID/edit" component={EditUserPage} />
				<Redirect to="/" />
			</Switch>
		</div>
	)
}

export default App
