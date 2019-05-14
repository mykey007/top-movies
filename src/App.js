import React, { Component } from 'react';
import './App.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import MovieCard from './components/movieCard'
import MovieDialog from './components/movieDialouge'
const apiKey = '32a302191f734d8eebcefdd905b4fa44';
const OriginalMovies = [
  {id: 1, title: 'Requiem for a Dream'},
  {id: 2, title: 'Big Man Japan'},
  {id: 3, title: 'Twilight Zone'},
  {id: 4, title: 'Beetlejuice'}

];

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends Component {
  //add state to the component
  state = {movies: [], selectedMovie: null, searchText: ''};

  selectMovie = movie => this.setState({ selectedMovie: movie });
  clearMovie = () => this.setState({ selectedMovie: null });

  // add search

  searchTextChanged = e => this.setState({searchText: e.target.value});

  search = async e => {
    e.preventDefault();

    const {searchText} = this.state;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchText}`)
    const json = await response.json();
    this.setState({movies:json.results});
  }  


  // add lifecycle function to make it async
  async componentDidMount(){
    //fake it til you make it
    // setTimeout (() => 
    //   // update the state
    //   this.setState({movies: OriginalMovies}), 2000 
    // )


      //getting real data
     const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
     const json = await response.json();
     this.setState({movies:json.results})


     // made ajax request via fetch() function
     // used await in an async function to wait for response
     // used setState() function once the data is ready

  }
  render() {
    //read state update here 
    const {movies, selectedMovie, searchText} = this.state;

    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h1" color="inherit" className="title" >
              Top Rated Movies
            </Typography>
            <form onSubmit={this.search}>
              <Input
                className="searchMovies"
                type="search"
                value={searchText}
                placeholder="Search Movies"
                onChange={this.searchTextChanged}
                startAdornment={
                  <InputAdornment>
                    <span role="img" aria-label="Search">🔍</span>
                  </InputAdornment>
                }
              />
            </form>
          </Toolbar>
        </AppBar>

        <div className="App">
          {movies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              selectMovie={this.selectMovie} 
            />
          ))}
        </div>
        <MovieDialog movie={selectedMovie} handleClose={this.clearMovie} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
