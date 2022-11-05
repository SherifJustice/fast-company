import React from 'react'
import NavBar from '../components/navBar'
import Users from '../layouts/users'
import { Route, Switch } from 'react-router-dom'
import Main from '../layouts/main'
import Login from '../layouts/login'
import UserPage from '../components/userPage'

function App() {
	return (
		<div>
			<NavBar />
			<Switch>
				<Route exact path="/" component={Main} />
				<Route path="/login" component={Login} />
				<Route
					path="/users/:userID"
					render={(props) => <UserPage {...props} />}
				/>
				<Route path="/users" component={Users} />
			</Switch>
		</div>
	)
}

export default App
