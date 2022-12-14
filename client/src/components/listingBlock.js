import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
/**
 * The listing block component
 * Used for displaying each listing in the front end
 */

/**
 * Need to show the title, description, price, ownerId and a button that runs the handleBooking function
 * @param {Object} props React props
 * @param {Object} props.listingObj the listing object as returned from the database
 * @param {Boolean} props.showBookingButton whether the booking button should be activated
 * @param {Function} props.handleBooking takes in listingId. The function that handles the booking of this block
 */
function ListingBlock (props) {
	const [listings, setListings] = useState([])
	const [message, setMessage] = useState('')
	const [failed, setFailed] = useState(false)
	const [success, setSuccess] = useState(false)

	const getListings = () => {
		axios.get(`/listing/get`).then(res => {
			// console.log(res.data.success)
			setListings(res.response.data.listings)
			setSuccess(true)
			setFailed(false)
			setMessage('')
			
		}).catch(e => {
			// console.log(e.response.data.error)
			setSuccess(false)
			setFailed(true)
			setMessage(`Unable to find listings`)
		})
	}

	const printListings = () => {
		
		props.listingObj().title
		props.listingObj().description
		props.listingObj().price
		props.listingObj().ownerId
		if(props.showBookingButton){
			props.handleBooking(props.listingObj().ownerId)
		}
		/*
		for (let i = 0; i < listings.length; i++) {
			listings[i].title
			listings[i].description
			listings[i].price
			listings[i].ownerId

		}
		*/
		<Link id='linkToProfile' to={'../profile'}>Profile</Link>
		
	}
	
	if (!success) {
		return (
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}>
				<button
					id = 'getListingsButton'
					onClick = {getListings}
				>
					Get Listings
				</button>

				{failed ? <p id='failText'>{message}</p> : null}
				<Link id='linkToProfile' to={'../profile'}>Profile</Link>
			</div>
		)
	}
	return (
		printListings()
	)
}

export default ListingBlock
