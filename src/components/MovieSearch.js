import React, { Component } from 'react'
import SearchInput from "./SearchInput"
import MovieResults from "./MovieResults"

export default class MovieSearch extends Component {
	
	constructor(props){
    super(props)
    this.state = {
      query: '',
			error: false,
			movies: [],
			titleOrder: 'asc',
			yearOrder: 'asc',
			sortFilter: '',
			sortOrder: ''
		}
	}
	
	onSearchInput (evt) {
    this.setState({
      query: evt.target.value,
    })
  }

	onSubmitQuery(evt){
    evt.preventDefault()
		this.queryOmdb(this.state.query)
	}

	onSort(event, sortKey, order){
		const data = this.state.movies;
		let sortOrder = '';
		
		if (sortKey === 'Year' && order === 'asc') {
			sortOrder = 'desc'
			this.setState({
				yearOrder: 'desc',
				sortOrder: 'descending',
				sortFilter: 'Year'
			})
		}
		
		if (sortKey === 'Year' && order === 'desc') {
			sortOrder = 'asc'
			this.setState({
				yearOrder: 'asc',
				sortOrder: 'ascending',
				sortFilter: 'Year'
			})
		}

		if (sortKey === 'Title' && order === 'asc') {
			sortOrder = 'desc'
			this.setState({
				titleOrder: 'desc',
				sortOrder: 'descending',
				sortFilter: 'Title'
			})
		}

		if (sortKey === 'Title' && order === 'desc') {
			sortOrder = 'asc'
			this.setState({
				titleOrder: 'asc',
				sortOrder: 'ascending',
				sortFilter: 'Title'
			})
		}

		if (sortOrder === 'asc') {
			data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
		} else {
			data.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
		}
    this.setState({data})
  }
	
	queryOmdb(query){
		var term = query.replace(/\s/, "+"); // replace any white space characters with a "+"
  	var url = "https://omdbapi.com/?apikey=" + process.env.REACT_APP_OMDB_API_KEY + "&s=" + term;

		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({
					searchString: this.state.query,
					query: '',
				})
				
				if(data.Search) {
					this.setState({
						movies: data.Search
					})
					this.onSort(null, 'Title', 'desc')
				} else {
					this.setState({
						movies: []
					})
				}
			})
			.catch((error) => {
				this.setState({
					error: true,
					movies: []
				})
			});
	}

	render() {
		return (
			<div>
				<SearchInput
          handleSearchInput={ (evt) => this.onSearchInput(evt) }
          handleSubmitQuery={ (evt) => this.onSubmitQuery(evt) }
					query={this.state.query}
					/>
				<br />
				<div className="divider"></div>
				<br />
				<MovieResults 
					movies={this.state.movies} 
					searchString={this.state.searchString}
					error={this.state.error}
					handleSort={ (evt, sortKey, order) => this.onSort(evt, sortKey, order) }
					titleOrder={this.state.titleOrder}
					yearOrder={this.state.yearOrder}
					sortOrder={this.state.sortOrder}
					sortFilter={this.state.sortFilter}
					numResults={this.state.movies.length}
					/>
			</div>
		)
	}
}
