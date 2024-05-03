import axios from "axios";
import React, { useEffect, useState } from "react";
import { IMovie } from "../../models/IMovie";
import MovieContainer from "../movie-container/MovieContainer";
import { useNavigate } from "react-router-dom";

function MyMovies() {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [username, setUsername] = useState<string>("");
    const navigate = useNavigate();

    let getMovies = async () => {
        let response = await axios.get("http://localhost:8080/users/myMovies", {
            withCredentials: true
        }).then((response) => {
            setMovies(response.data);
        }).catch((error) => {
            console.error(error);
        });}

    let checkLoggedIn = () => {
        let response = axios.get('http://localhost:8080/users/session',
        {withCredentials: true}
        ).then((response) => {
            if(!response.data) {
                navigate("/users/login");
            } else {
                setUsername(response.data.username);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        checkLoggedIn();
        getMovies();
    }, []);
    return (
        <div>
            <h1 className="rounded-2 movie-form-header">{username}'s Movies</h1>
            <MovieContainer movies={movies}></MovieContainer>
        </div>
    )
}
export default MyMovies;