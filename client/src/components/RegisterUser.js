import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

/**
 * Register user page
 * @param {Object} props
 */
function RegisterUser (props) {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	// const [disableSubmit, setDisableSubmit] = useState(true)

	/**
		 * Submit form and register user
		 */
	const handleSubmit = () => {
		axios.post('http://localhost:5000/user/register', {
			email,
			username,
			password
		}).then(res => {
			console.log(res.data.success)
		}).catch(e => {
			console.log(e.response.data.error)
			alert('Unable to register')
		})
	}

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		}}>
			<p>Register</p>
			<p>After sucessful register, please login</p>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<p>Email</p>
				<input
					type = "text"
					id = 'emailBox'
					value = {email}
					onChange = {(event) => setEmail(event.target.value)}
				/>
			</div>

			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<p>Username</p>
				<input
					type = "text"
					id = 'usernameBox'
					value = {username}
					onChange = {(event) => setUsername(event.target.value)}
				/>
			</div>

			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<p>Password</p>
				<input
					type = "text"
					id = 'passwordBox'
					value = {password}
					onChange = {(event) => setPassword(event.target.value)}
				/>
			</div>

			<button
				id = 'submitButton'
				onClick = {handleSubmit}
			>
				Register
			</button>
			<Link to={'../login'}>Sign In</Link>
		</div>
	)
}

export default RegisterUser
