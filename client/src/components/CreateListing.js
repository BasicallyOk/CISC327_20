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
    const [ownerId, setOwnerId] = useState('')
    const [lastModifiedDate, setLastModifiedDate] = useState('')
	// const [disableSubmit, setDisableSubmit] = useState(true)

	/**
		 * Submit form and create listing
		 */
	const handleSubmit = () => {
		axios.post('http://localhost:5000/listing/create', {
			title,
			description,
			price,
            ownerId,
            lastModifiedDate
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
					data-testid = 'titleBox'
					value = {email}
					onChange = {(event) => setEmail(event.target.value)}
				/>
			</div>

			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<p>Description</p>
				<input
					type = "text"
					data-testid = 'descriptionBox'
					value = {username}
					onChange = {(event) => setUsername(event.target.value)}
				/>
			</div>

			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<p>Price</p>
				<input
					type = "text"
					data-testid = 'priceBox'
					value = {password}
					onChange = {(event) => setPassword(event.target.value)}
				/>
			</div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
				<p>Owner ID</p>
				<input
					type = "text"
					data-testid = 'ownerIdBox'
					value = {password}
					onChange = {(event) => setPassword(event.target.value)}
				/>
			</div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
				<p>Last Modified Date</p>
				<input
					type = "text"
					data-testid = 'lastModifiedDateBox'
					value = {password}
					onChange = {(event) => setPassword(event.target.value)}
				/>
			</div>

			<button
				data-testid = 'submitButton'
				onClick = {handleSubmit}
			>
				Create Listing
			</button>
			<Link to={'..'}>Sign In</Link>
		</div>
	)
}

export default CreateListing
