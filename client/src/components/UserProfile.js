import React from 'react'
import { Navigate, Link } from 'react-router-dom'

function UserProfile (props) {
	// if login sucessful take to profile page
	if (props.user) {
		return (
			<div>
				<h1>UserProfile</h1>
				<Link to='../updateListing'>updateListing</Link>
			</div>
		)
	}
	return (
	// if login fails then navigate back to login page
		<Navigate to='../login'/>
	)
}

export default UserProfile
