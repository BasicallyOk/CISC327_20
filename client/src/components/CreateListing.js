import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

/**
 * Create listing page
 * @param {Object} props
 */
function CreateListing (props) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [success, setSuccess] = useState(false)
	const [failed, setFailed] = useState(false)
	const lastModifiedDate = Date.now()
	const ownerId = props.user._id// GET ID OF PERSON LOGGED IN
	// const [disableSubmit, setDisableSubmit] = useState(true)

	/**
		 * Submit form and create listing
		 */
	const handleSubmit = () => {
		axios.post('/listing/create', {
			title,
			description,
			price,
			lastModifiedDate,
			ownerId
		}).then(res => {
			console.log(res.data.success)
			setFailed(false)
			setSuccess(true)
		}).catch(e => {
			console.log(e.response.data.error)
			setFailed(true)
		})
	}

	if (!success) {
		return (
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}>
				<p>Create Listing</p>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<p>Title</p>
					<input
						type = "text"
						id = 'titleBox'
						value = {title}
						onChange = {(event) => setTitle(event.target.value)}
					/>
				</div>

				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<p>Description</p>
					<input
						type = "text"
						id = 'descriptionBox'
						value = {description}
						onChange = {(event) => setDescription(event.target.value)}
					/>
				</div>

				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<p>Price</p>
					<input
						type = "text"
						id = 'priceBox'
						value = {price}
						onChange = {(event) => setPrice(event.target.value)}
					/>
				</div>

				<button
					id = 'submitButton'
					onClick = {handleSubmit}
				>
					Create Listing
				</button>

				{failed ? <p id='failText'>Unable to create listing</p> : null}

				{props.user._id ? <p>{props.user._id}</p> : <p>Not supposed to happen</p>}

				<Link id='linkToProfile' to={'../profile'}>Profile</Link>
			</div>
		)
	}
	return (<Navigate to='../profile' />)
}

export default CreateListing
