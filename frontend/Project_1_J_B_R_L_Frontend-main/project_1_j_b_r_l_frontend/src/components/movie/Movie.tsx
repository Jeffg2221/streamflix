import React from "react";
import { IMovie } from "../../models/IMovie";
import { Link } from "react-router-dom";
//import "./Movie.css";

interface IMovieProps {
    movie: IMovie;
}

function Movie(props: IMovieProps) {
    return (
        <div className="col">
            <div  className="card mb-3 text-bg-secondary movie-card">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={props.movie.snapshot} className="img-fluid rounded-start" alt="movie poster" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title"><Link to={'/movies/'+props.movie.movieId}>{props.movie.name}</Link></h5>
                            
                            <p className="card-text">{props.movie.description}</p>
                            <p className="card-text">
                                <small className="text-body-secondary">
                                    ${props.movie.price % 1 === 0 ? props.movie.price.toFixed(2) : props.movie.price}
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    /*
    return (
        <div className="movie">
            <Link to={'/movies/'+ props.movie.movieId}>{props.movie.name}</Link>
            <h3>Description</h3>
            <p>{props.movie.description}</p>
            <p>Price: ${props.movie.price}</p>
        </div>
    )
    */
}

export default Movie;