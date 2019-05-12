import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './movieCard.css';
const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

class MovieCard extends React.Component {
  selectMovie = () => {
    const { movie, selectMovie } = this.props;
    selectMovie(movie);
  };

	render(){

		const {movie} = this.props;
		return (
			<Card className="movie-card">
        <CardMedia
      	  className="movie-image"
          image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.title}
          </Typography>
          <Typography>
          <p>Release Date: <b>{movie.release_date}</b></p>
          <p>Rating: <b> {movie.vote_average}/10</b></p>
          </Typography>
          <Typography component="p">
             {movie.overview}
           </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={this.selectMovie}>
          Learn More
        </Button>
      </CardActions>
    </Card>

		);
	}
}
// MovieCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
// export default withStyles(styles)(MovieCard);

export default MovieCard;