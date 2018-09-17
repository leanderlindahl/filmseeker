import React, { Component } from 'react';
import MovieSearch from './MovieSearch';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
					<h1 className="App-title">Film Seeker</h1>
        </header>
        
				<div className="container">
					<div className="row">
						<MovieSearch />
					</div>
				</div>
      </div>
    );
	}
}

export default App;
