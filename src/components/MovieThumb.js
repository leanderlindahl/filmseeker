import React, { Component } from 'react'
import missing from './missing.jpg'

export default class MovieThumb extends Component {
	
	noImageFunction(ev) {
		ev.target.src = missing
	}

	render() {
		//imageSourece = 
		if(this.props.imageSource.startsWith('http')) {
			return (
				<img 
					src={this.props.imageSource} 
					alt={this.props.altText} 
					className="responsive-img" 
					onError={this.noImageFunction} />
			)
		}
		else {
			return (
				<div className="center-align"> No image provided.</div>
			)
		}
	}
}
