import React, { SyntheticEvent, useState, useEffect } from "react";
import { IMovie } from "../../models/IMovie";
import MovieContainer from "../movie-container/MovieContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AdminUserMovies.css';

function AdminUserMovies() {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [userId, setUserId] = useState<number>(0);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [className, setClassName] = useState<string>("empty");
    const navigate = useNavigate();
    
    let updateUserId = (e: SyntheticEvent) => {
        setUserId(parseInt((e.target as HTMLInputElement).value))
    }
    let getMovies = async (e: React.FormEvent) => {
        e.preventDefault();

        let response = await axios.get(`http://localhost:8080/users/admin/${userId}`, 
        {withCredentials: true}
        ).then((response) => {
            setClassName("empty");
            setText("");
            if (response.data.length === 0) {
                setText("User has no movies");
                setClassName("error");
            }
            setMovies(response.data);
            setSubmitted(true);
        }).catch((error) => {
            setText("User not found or Invalid ID");
            setClassName("error");
            setMovies([]);
            console.error(error);
        });
    }


    let navigateTo = useNavigate();

    useEffect(() => {
        let checkForAdminUser = async () => {
            try {
                let res = await axios.get('http://localhost:8080/users/admin', {
                    withCredentials: true
                });
            } catch (error : any) {
                let status = error.response.status;
                if (status === 401) {
                    console.log("Session is invalid");
                    navigateTo('/users/login');
                } else if (status === 403){
                    console.log("Unauthorized access");
                    navigateTo('/movies');
                }
            }
        }
    
        checkForAdminUser();
    }, []);

    return (
        <div className="adminGetUserMovies">
            <h1>Get a Users Purchased Movies</h1>
            <form>
                <label>UserId</label>
                <input onChange={updateUserId} type="text" name="userid" />
                <button type="submit" onClick={getMovies}>Get Movies</button>
            </form>
            <h2 className={className}>{text}</h2>
            <div style={{ width: '100%' }}>
            {submitted && <MovieContainer movies={movies}></MovieContainer>}
            </div>
        </div>
    )
}
export default AdminUserMovies;