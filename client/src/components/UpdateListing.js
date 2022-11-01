import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function UpdateListing (props) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')

	const handleSubmit = () => {
		axios.post('http://localhost:5000/listing/update', {
			title,
			description,
			price
		}).then(res => {
			console.log(res.data.success)
		}).catch(e => {
			console.log(e.response.data.error)
			alert('Unable to login')
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
				<p>Descriptio</p>
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
			<Link to={'..'}>Update Listing</Link>
		</div>
	)
}

export default UpdateListing
