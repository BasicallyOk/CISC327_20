import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

/**
 * Login user page
 * @param {Object} props
 */
function LoginUser (props) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	// const [disableSubmit, setDisableSubmit] = useState(true)

	/**
		 * Submit form and login the user
		 */
	const handleSubmitToken = () => {
		axios.post('http://localhost:5000/user/login', {
			email,
			password
		}).then(res => {
			console.log(res.data.success)
			console.log(res.data.user)
			props.setUser(res.data.user)
		}).catch(e => {
			console.log(e)
			alert('Unable to login')
		})
	}

	// if login is not sucessful then return login page
	if (!props.user) {
		return (
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}>
				<p>Login</p>
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
					onClick = {handleSubmitToken}
				>
				Login
				</button>
				<Link to={'/register'}>Register</Link>
			</div>
		)
	}
	// go to profile page if user logins sucessfully
	return (<Navigate to='../profile' />)
}

export default LoginUser
