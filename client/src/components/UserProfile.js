import React from 'react'
import { Navigate, Link } from 'react-router-dom'

function UserProfile (props) {
	// if login sucessful take to profile page
	if (props.user) {
		return (
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}>
				<h1>UserProfile</h1>
				<Link id='createListing' to='../create'>Create Listing</Link>
				<Link id='updateListing' to='../updateListing'>Update Listing</Link>
				<Link id='updateUser' to='../updateUser'>Update User </Link>
				<Link id='createBooking' to='../createBooking'>Create Booking </Link>
			</div>
		)
	}
	return (
	// if login fails then navigate back to login page
		<Navigate to='../login'/>
	)
}

export default UserProfile
