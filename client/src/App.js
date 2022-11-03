import React, { useState } from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom'
import './App.css'
import RegisterUser from './components/RegisterUser'
import LoginUser from './components/LoginUser'
import UserProfile from './components/UserProfile'
import UpdateListing from './components/UpdateListing'
import CreateListing from './components/CreateListing'

import axios from 'axios'

function App () {
	// token and setToken are the return values of the useState
	const [user, setUser] = useState()

	return (
		<Router>
			<div>
				<Routes>
					<Route path="/login" element={<LoginUser user={user} setUser={setUser}/>} />
					<Route path="/register" element={<RegisterUser />} />
					<Route path='/profile' element={<UserProfile user={user}/>}/>
					<Route path="/" element={<Main />} />
					<Route path="/updateListing" element={<UpdateListing />} />
					<Route path="/create" element={<CreateListing user ={user}/>} />
				</Routes>
			</div>
		</Router>
	)
}

function Main () {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		}}>
			<h4>QBNB</h4>
			<Link to={'register'}>Register</Link>
			<Link to={'login'}>Login</Link>
			<button onClick={() => axios.get('http://localhost:5000/')}>Ping server</button>
		</div>
	)
}

export default App
