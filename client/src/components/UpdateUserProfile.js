import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import axios from 'axios'

function UpdateUserProfile (props) {
	const [username, setUsername] = useState('')
	const [billingAddress, setBillingAddress] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [failed, setFailed] = useState(false)
	const [success, setSuccess] = useState(false)

	const handleSubmit = () => {
		axios.post('/user/update', {
			username,
			billingAddress,
			postalCode,
			email: props.user.email
		}).then(res => {
			// console.log(res.data.success)
			setFailed(false)
			setSuccess(true)
		}).catch(e => {
			// console.log(e)
			setFailed(true)
		})
	}

	if (props.user) {
		return (
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}>
				<p>Update</p>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<p>Username</p>
					<input
						type = 'text'
						id = 'userBox'
						value = {username}
						onChange = {(event) => setUsername(event.target.value)}
					/>
				</div>

				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<p>Billing Address</p>
					<input
						type = 'text'
						id = 'billingBox'
						value = {billingAddress}
						onChange = {(event) => setBillingAddress(event.target.value)}
					/>
				</div>

				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<p>Postal Code</p>
					<input
						type= 'text'
						id = 'postalBox'
						value = {postalCode}
						onChange = {(event) => setPostalCode(event.target.value)}
					/>
				</div>

				<button
					id = 'submitButton'
					onClick={handleSubmit}
				>
					Update
				</button>

				{failed ? <p id='failText'>Unable to update</p> : null}
				{success ? <p id='successText'>Update successful</p> : null}

				<Link to={'..'}>User</Link>
			</div>
		)
	}
	return (
		<Navigate to='../profile'/>
	)
}

export default UpdateUserProfile
