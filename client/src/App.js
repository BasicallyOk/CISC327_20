import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom'
import './App.css'
import RegisterUser from './components/RegisterUser'

import axios from 'axios'

function App () {
	return (
		<Router>
			<div>
				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/register" element={<RegisterUser />} />
				</Routes>
			</div>
		</Router>
	)
}

function Main () {
	return (
		<div>
			<h4>QBNB</h4>
			<Link to={'register'}>Register</Link>
			<button onClick={() => axios.get('http://localhost:5000/')}>Ping server</button>
		</div>
	)
}

export default App
