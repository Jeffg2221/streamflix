import axios from 'axios'
import React, { useState } from 'react'
import './GetMovieById.css';
import { useParams } from 'react-router-dom'
import { IMovie } from '../../models/IMovie'
import { useNavigate } from 'react-router-dom';

function GetMovieById() {
    const {id} = useParams()
    const [movie, setMovie] = React.useState<IMovie>();
    const [own, setOwn] = useState(false);
    const navigateTo = useNavigate();
    const getMovie = () => {
        axios.get<IMovie>('http://localhost:8080/movies/'+id, {withCredentials: true})
        .then(response => {
          setMovie(response.data)
          getUserMovies();

        })
        .catch((error) => {console.log(error)})
    }

    const getUserMovies = async () => {
      axios.get<IMovie[]>('http://localhost:8080/users/myMovies', {withCredentials: true})
      .then(response => {
        let userMovies : IMovie[]= response.data;
        for (let i = 0; i < userMovies.length; i++) {
          if (userMovies[i].movieId === Number(id)) {
            setOwn(true);
          }
        }
      })
      .catch((error) => {console.log(error)
        if (error.response.status === 401) {
          navigateTo('/');
        }
      })
    }

    const buyMovie = () => {
      axios.post('http://localhost:8080/movies/buy/'+id, {},
        {withCredentials: true}
      )
      .then(response => {
        console.log(response.data)
        setOwn(true);
        window.alert("You have successfully bought the movie!");
      })
      .catch((error) => {
        console.log(error)
        setOwn(false);
        document.querySelector('.alert-container')!.innerHTML =`<div class="alert alert-danger" role="alert"><strong>Oh no! </strong>${error.response.data}</div>`
    });
  }
      React.useEffect(getMovie, [])
      return (
        <>
        <div className="darkout">
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className={own?"card text-bg-dark bg-gradient":"card bg-warning bg-gradient"} style={{ width: '60rem' }}>
            <div className="card-body .bg-warning.bg-gradient" style={{ fontSize: '1.2rem' }}>
              <h1 className="card-title">{movie?.name}</h1>
              {!own&&<h2 className="card-text">${(movie?.price ?? 0) % 1 === 0 ? movie?.price?.toFixed(2) : movie?.price}</h2>}
              {!own && movie?.snapshot && <img src={movie?.snapshot} className="thumbnail" alt="thumbnail" />}
            <div className="iframe-container">
              {own && movie?.url && <iframe src={movie?.url}></iframe>}
            </div>
            <br/>
            {!own&&movie?.description&&<p className="card-text buy-or-read">{movie?.description}</p>}
            <div  className="alert-container">

            </div>
            {!own && <button  onClick={buyMovie} className='btn btn-success'>Buy</button>}
            </div>
          </div>
        </div>
        </div>
        </>
      )
}

export default GetMovieById


