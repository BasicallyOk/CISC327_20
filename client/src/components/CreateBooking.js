import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

/**
 * Create booking page
 * @param {Object} props
 */
function CreateBooking (props) {
	const [title, findTitle] = useState('')
	const [success, setSuccess] = useState(false)
	const [failed, setFailed] = useState(false)
	// const [disableSubmit, setDisableSubmit] = useState(true)

	/**
		 * Submit form and create booking
		 */
	const handleSubmit = () => {
		axios.post('/booking/create', {
			title
		}).then(res => {
			// // console.log(res.data.success)
			setFailed(false)
			setSuccess(true)
		}).catch(e => {
			// console.log(e.response.data.error)
			setFailed(true)
			setSuccess(false)
		})
	}

	if (!success) {
		return (
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}>
				<p>Create Booking</p>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<p>Title</p>
					<input
						type = "text"
						placeholder = 'search by title of listing..'
						id = 'titleBox'
						value = {title}
						onChange = {(event) => findTitle(event.target.value)}
					/>
				</div>

				<button
					id = 'submitButton'
					onClick = {handleSubmit}
				>
					Create Booking
				</button>

				{failed ? <p id='failText'>Unable to create booking</p> : null}

				<Link id='linkToProfile' to={'../profile'}>Profile</Link>
			</div>
		)
	}
	return (<Navigate to='../profile' />)
}

export default CreateBooking
