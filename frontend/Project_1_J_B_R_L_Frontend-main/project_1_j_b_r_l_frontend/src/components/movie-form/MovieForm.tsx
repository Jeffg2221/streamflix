import React, {MouseEvent, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './MovieForm.css';
import { IMovie } from "../../models/IMovie";
import { useNavigate } from 'react-router-dom';


function MovieForm() {
  const [movieTitle, setMovieTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [url, setURL] = React.useState('');
  const [snapshot, setSnapshot] = React.useState('');

  let navigateTo = useNavigate();

  let setMovieTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieTitle(e.target.value);
  }
  let setPriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  }
  let setDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }
  let setURLHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setURL(e.target.value);
  }
  let setSnapshotHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSnapshot(e.target.value);
  }
  let cancelOperation = (e : MouseEvent) => {
    e.preventDefault();
    const form = document.getElementById('movie-form') as HTMLFormElement;
    form.reset();
    navigateTo('/');
  }

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

  // make a POST request to the server to add a movie using axios
  let addMovie = async(e : MouseEvent) => {
    //I need to prevent the default behavior of the form while also making sure the required inputs are filled out
    e.preventDefault();
    const form = document.getElementById('movie-form') as HTMLFormElement;

    if (form.checkValidity()) {
      let res = await axios.post('http://localhost:8080/movies',
      {name: movieTitle,
      price: price,
      description: description,
      url: url,
      snapshot: snapshot}, {withCredentials: true}).then((response) => {
      console.log(response);
      document.querySelector('.alert-container')!.innerHTML =`<div class="alert alert-success" role="alert"><strong>Well done! </strong>${movieTitle} has been added to the selection successfully!</div>`
      //clear the form
      form.reset();
      })
      .catch((error) => {
      console.log(error);
      document.querySelector('.alert-container')!.innerHTML = 
              `<div class="alert alert-danger" role="alert"><strong>Oh snap! </strong>${error.response.data}</div>`;
      });
    } else {
      form.classList.add('was-validated');
    }
  }
  
  return (
    <form className = "row g-3 needs-validation movie-form" id = "movie-form" >
        <h2 className="rounded-2 movie-form-header">Add a Movie</h2>
        <div className="alert-container">
        </div>
        <div className='col-md-6'>
            <label htmlFor='formGroupExampleInput' className="form-label movie-label">Movie Title</label>
            <input type='text' className='form-control' onChange={setMovieTitleHandler} placeholder='i.e. Star Wars: Episode III – Revenge of the Sith...' aria-label='Movie Title' aria-describedby='addon-wrapping' required/>
            <div className='valid-feedback'>Looks good!</div>
        </div>
        <div className='col-md-6'>
            <label htmlFor='formGroupExampleInput' className="form-label movie-label" id='addon-wrapping'>Price</label>
            <input type='number' step="0.01"className='form-control' onChange={setPriceHandler} placeholder='i.e. $9.00' aria-label='Price' aria-describedby='addon-wrapping' required/>
            <div className='invalid-feedback'>Please provide a valid price.</div>
        </div>
        <div className='col-md-6'>
            <label htmlFor='formGroupExampleInput' className="form-label movie-label">Description</label>
            <textarea className='form-control' onChange={setDescriptionHandler} aria-label='Description' rows={3} aria-describedby='addon-wrapping'></textarea>
        </div>
        <div className='col-md-6'>
            <label htmlFor='formGroupExampleInput' className="form-label movie-label">Source URL</label>
            <input type='text' className='form-control' onChange={setURLHandler} placeholder='i.e. https://youtu.be/N7ZmPYaXoic?si=8pHzhal' aria-label='Source' aria-describedby='addon-wrapping' required/>  
        </div>
        <div className='col-md-6'>
            <label htmlFor='formGroupExampleInput' className="form-label movie-label">Snapshot URL</label>
            <input type='text' className='form-control' onChange={setSnapshotHandler} placeholder='https://www.google.com/url?sa=i&url=https%3A' aria-label='Snapshot' aria-describedby='addon-wrapping'/>
            <div className='invalid-feedback'>Please provide a valid URL.</div>
        </div>
        <div className="col-6">
            <button type="submit" className="btn btn-primary movie-form-btn" onClick={(e) => addMovie(e)}>Publish</button>
            <button type="reset" className="btn btn-warning movie-form-btn">Reset</button>
            <button type="submit" className="btn btn-danger movie-form-btn" onClick={(e) => cancelOperation(e)}>Cancel</button>
        </div>

    </form>
  )
}

export default MovieForm