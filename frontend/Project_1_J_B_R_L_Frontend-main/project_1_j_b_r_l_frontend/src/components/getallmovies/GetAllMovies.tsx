import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { IMovie } from "../../models/IMovie";
import MovieContainer from "../movie-container/MovieContainer";

function GetAllMovies() {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    
    let getMovies = async () => {
        let response = await axios.get("http://localhost:8080/movies", {
            withCredentials: true
        }).then((response) => {
            setMovies(response.data);
        }).catch((error) => {
            console.error(error);
            console.error('Error fetching movies:', error);
            setError('Failed to fetch movies.');
        });}

    let checkLoggedIn = () => {
        let response = axios.get('http://localhost:8080/users/session',
        {withCredentials: true}
        ).then((response) => {
            if(!response.data) {
                navigate("/users/login");
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
            <h2 className="rounded-2 movie-form-header">Movie List</h2>
            {error && <p>{error}</p>}
            <MovieContainer movies={movies}></MovieContainer>
        </div>
  )
}

export default GetAllMovies
