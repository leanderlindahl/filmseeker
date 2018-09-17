import React, { Component } from 'react'
import MovieThumb from './MovieThumb'
import styles from './styles/index'

export default class MovieResults extends Component {
	
	constructor(props){
    super(props)
    this.state = {
			titleOrder: this.props.titleOrder,
			yearOrder: this.props.yearOrder
    }
	}
	
	render(){
		if(this.props.movies.length > 0) {
			// Configure the icon-arrows
			let titleArrow, yearArrow;
			titleArrow = this.props.titleOrder === 'asc' ? titleArrow = 'down' : titleArrow = 'up';
			yearArrow = this.props.yearOrder === 'asc' ? yearArrow = 'down' : yearArrow = 'up';

			let {movies} = this.props
			let {handleSort} = this.props
			let results = movies.map( (movie, index) => {
				return (
					<tr 
						key={index} 
						style={styles.movie} 
						onClick={()=> window.open(`http://www.imdb.com/title/${movie.imdbID}`, "_blank")} >
						<td>
							<MovieThumb imageSource={movie.Poster} altText={movie.Title} />
						</td>
						<td>{movie.Title}</td>
						<td>{movie.Year}</td>
					</tr>					
				)
			})

			return (
				<div style={styles.movies}>
					{this.props.numResults} search results for:&nbsp;<b>{this.props.searchString}</b>, ordered by {this.props.sortFilter} in {this.props.sortOrder} order.
					<table>
						<thead>
							<tr>
								<th width="10%">Image</th>
								<th onClick={e => handleSort(e, 'Title', this.props.titleOrder)}>Title<i className="material-icons">{`arrow_drop_${titleArrow}`}</i></th>
								<th onClick={e => handleSort(e, 'Year', this.props.yearOrder)}>Year<i className="material-icons">{`arrow_drop_${yearArrow}`}</i></th>
							</tr>
						</thead>
						<tbody>
							{results}
						</tbody>
					</table>
				</div>
			)
		}
		else if (this.props.error) {
			return (
				<div>
					<h5>Search failed.</h5>
					<p>Unable to connect to the API.</p>
				</div>
			)	
		}
		else {
			return (
				<div>
					<h5>No result.</h5>
					<p>Your search didn't yield any results.</p>
				</div>
			)
		}
	}
}
