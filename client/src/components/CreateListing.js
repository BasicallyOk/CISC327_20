import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

/**
 * Create listing page
 * @param {Object} props
 */
function CreateListing (props) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
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
		}).catch(e => {
			console.log(e.response.data.error)
		})
	}

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
			{props.user._id ? <p>{props.user._id}</p> : <p>Penis</p>}
			<Link to={'..'}>Update Listing</Link>
		</div>
	)
}

export default CreateListing
