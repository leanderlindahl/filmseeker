import React, { Component } from 'react'

export default class ErrorMessage extends Component {
	render() {
		return (
			<div>
				<h3>Search failed.</h3>
				<p>Unable to connect to the API Source</p>
			</div>
		)
	}
}
