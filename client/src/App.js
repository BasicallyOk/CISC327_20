import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom'
import './App.css'
import RegisterUser from './components/RegisterUser'
import UpdateListing from './components/UpdateListing'
import CreateListing from './components/CreateListing'

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
					<Route path="/updateListing" element={<UpdateListing />} />
					<Route path="/create" element={<CreateListing />} />
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
			<Link to={'updateListing'}>Update Listing</Link>
			<Link to={'create'}>Create Listing</Link>
			<button onClick={() => axios.get('http://localhost:5000/')}>Ping server</button>
		</div>
	)
}

export default App
