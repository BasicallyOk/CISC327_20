import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import ListingBlock from './listingBlock'
import axios from 'axios'

/**
 * Create booking page
 * @param {Object} props
 */
function CreateBooking (props) {
	const [title, setTitle] = useState('')
	const [startDate, setStart] = useState('')
	const [endDate, setEnd] = useState('')
	const [guestNum, setGuestNum] = useState(1)
	const [failed, setFailed] = useState(false)
	const [success, setSuccess] = useState(false)
	const [message, setMessage] = useState('')
	const [listings, setListings] = useState([])

	/**
	 * Submit form and find listing
	 */
	const handleSubmit = () => {
		axios.get(`/listing/find/title/${title}`).then(res => {
			// // console.log(res.data.success)
			setListings(res.response.data.listings)
			setFailed(false)
			setMessage('')
		}).catch(e => {
			// console.log(e.response.data.error)
			setFailed(true)
			setMessage(`Unable to find the listing ${title}`)
		})
	}

	const handleBooking = (listingId, userId, guestNum, startDate, endDate) => {
		axios.post('/booking/create', {
			listingId,
			userId: props.user._id,
			guestNum,
			startDate,
			endDate
		}).then(res => {
			setSuccess(true)
		}).catch(e => {
			// console.log(e.response.data.error)
			setFailed(true)
			setMessage('Unable to create the booking')
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
						onChange = {(event) => setTitle(event.target.value)}
					/>
				</div>

				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<p>Start Date</p>
					<input
						type = "text"
						placeholder = 'Enter start date of booking'
						id = 'startDateBox'
						value = {startDate}
						onChange = {(event) => setStart(event.target.value)}
					/>
				</div>

				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<p>End Date</p>
					<input
						type = "text"
						placeholder = 'Enter end date of booking'
						id = 'endDateBox'
						value = {endDate}
						onChange = {(event) => setEnd(event.target.value)}
					/>
				</div>

				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<p>Gest Num</p>
					<input
						type = "text"
						placeholder = 'Enter the number of guests'
						id = 'guestNumBox'
						value = {guestNum}
						onChange = {(event) => setGuestNum(event.target.value)}
					/>
				</div>

				<button
					id = 'submitButton'
					onClick = {handleSubmit}
				>
					Create Booking
				</button>

				{failed ? <p id='failText'>{message}</p> : null}

				{listings.length > 0
					? (
						<ul>
							{
								listings.map((listing) => {
									return (
										<li key={listing._id}>
											<ListingBlock listingObj={listing} showBookingButton={true} handleBooking={handleBooking}/>
										</li>
									)
								})
							}
						</ul>

					)
					: null}

				<Link id='linkToProfile' to={'../profile'}>Profile</Link>
			</div>
		)
	}
	return (<Navigate to='../profile' />)
}

export default CreateBooking
