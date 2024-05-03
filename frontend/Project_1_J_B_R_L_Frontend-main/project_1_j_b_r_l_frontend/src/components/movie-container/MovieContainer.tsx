import { IMovie } from "../../models/IMovie";
//import "./MovieContainer.css";
import Movie from "../movie/Movie";

function MovieContainer(props: { movies: IMovie[] }) {
    function compare(a: IMovie, b: IMovie) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }
    

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {props.movies.sort(compare).map((movieMap) => (
                <Movie key={movieMap.movieId} movie={movieMap}></Movie>
            ))}
        </div>
    );
}

export default MovieContainer;