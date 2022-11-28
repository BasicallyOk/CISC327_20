import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function UpdateListing (props) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [success, setSuccess] = useState(false)
	const [failed, setFailed] = useState(false)

	const handleSubmit = () => {
		axios.post('/listing/update', {
			title,
			description,
			price
		}).then(res => {
			// console.log(res.data.success)
			setSuccess(true)
			setFailed(false)
		}).catch(e => {
			// console.log(e.response.data.error)
			setFailed(true)
			setSuccess(false)
		})
	}

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		}}>
			<p>Update</p>
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
				Update
			</button>
			{failed ? <p id='failText'>Unable to update listing</p> : null}
			{success ? <p id='successText'>successfully updated listing</p> : null}
			<Link to={'..'}>Update Listing</Link>
		</div>
	)
}

export default UpdateListing
