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
    const [lastModifiedDate, setLastModifiedDate] = useState('')
    const [ownerId, setOwnerId] = useState('')
	// const [disableSubmit, setDisableSubmit] = useState(true)

	/**
		 * Submit form and create listing
		 */
	const handleSubmit = () => {
		axios.post('http://localhost:5000/listing/create', {
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
					data-testid = 'titleBox'
					value = {title}
					onChange = {(event) => setTitle(event.target.value)}
				/>
			</div>

			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<p>Description</p>
				<input
					type = "text"
					data-testid = 'descriptionBox'
					value = {description}
					onChange = {(event) => setDescription(event.target.value)}
				/>
			</div>

			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<p>Price</p>
				<input
					type = "text"
					data-testid = 'priceBox'
					value = {price}
					onChange = {(event) => setPrice(event.target.value)}
				/>
			</div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
				<p>Last Modified Date</p>
				<input
					type = "text"
					data-testid = 'lastModifiedDateBox'
					value = {lastModifiedDate}
					onChange = {(event) => setLastModifiedDate(event.target.value)}
				/>
			</div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
				<p>Owner ID</p>
				<input
					type = "text"
					data-testid = 'ownerIdBox'
					value = {ownerId}
					onChange = {(event) => setOwnerId(event.target.value)}
				/>
			</div>

			<button
				data-testid = 'submitButton'
				onClick = {handleSubmit}
			>
				Create Listing
			</button>
			<Link to={'..'}>Update Listing</Link>
		</div>
	)
}

export default CreateListing
