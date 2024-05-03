import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './updateMovieForm.css';

function UpdateMovieForm() {
    const [movieId, setMovieId] = useState(0);
    const [movieTitle, setMovieTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [url, setURL] = useState('');
    const [snapshot, setSnapshot] = useState('');


    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/movies/${id}`);
                const { movieId, name, price, description, url, snapshot } = response.data;
                setMovieTitle(name);
                setPrice(price);
                setDescription(description);
                setURL(url);
                setSnapshot(snapshot);
            
            } catch (error) {
                console.error('Failed to fetch movie', error);
            }
        };

        fetchMovie();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
    

        try {
            await axios.put(`http://localhost:8080/movies/${id}`, {
                name: movieTitle,
                price: price,
                description: description,
                url: url,
                snapshot: snapshot
            }, { withCredentials: true});

            alert(`${movieTitle} has been updated successfully!`);
            navigate('/');
        } catch (error: any) {
            alert(`Error updating movie: ${error.message}`);
        }
    };

    

    return (
        <form className = "row g-3 needs-validation movie-form" id = "movie-form" noValidate onSubmit={handleSubmit}>
            <h2 className="rounded-2 movie-form-header">Update Movie</h2>
            <div className="alert-container">
        </div>
            <div className="col-md-6">
                <label htmlFor='formGroupExampleInput' className="form-label movie-label">Movie Title</label>
                <input type='text' className='form-control' id="movieTitle" value={movieTitle}  placeholder='i.e. Star Wars: Episode III – Revenge of the Sith...' aria-label='Movie Title' aria-describedby='addon-wrapping'  onChange={e => setMovieTitle(e.target.value)} required/>
                <div className='valid-feedback'>Looks good!</div>
            </div>
            <div className='col-md-6'>
            <label htmlFor='formGroupExampleInput' className="form-label movie-label" id='addon-wrapping'>Price</label>
            <input type='number' step="0.01"className='form-control' id="price" value={price} onChange={e => setPrice(e.target.value)} placeholder='i.e. $9.00' aria-label='Price' aria-describedby='addon-wrapping'  required/>
            <div className='invalid-feedback'>Please provide a valid price.</div>
            </div>
            <div className='col-md-6'>
            <label htmlFor='formGroupExampleInput' className="form-label movie-label">Description</label>
                <textarea className="form-control" id="description" value={description} onChange={e => setDescription(e.target.value)} rows={parseInt("4")} aria-label='Description'  aria-describedby='addon-wrapping'></textarea>
            </div>
            <div className='col-md-6'>
            <label htmlFor='formGroupExampleInput' className="form-label movie-label">Source URL</label>
                <input type="text" className="form-control" id="url" value={url} onChange={e => setURL(e.target.value)} placeholder='i.e. https://youtu.be/N7ZmPYaXoic?si=8pHzhal' aria-label='Source' aria-describedby='addon-wrapping' required/>
            </div>
            <div  className='col-md-6'>
            <label htmlFor='formGroupExampleInput' className="form-label movie-label">Snapshot URL</label>
            <input type='text' className='form-control' id="snapshot" value={snapshot} onChange={e => setSnapshot(e.target.value)} placeholder='https://www.google.com/url?sa=i&url=https%3A' aria-label='Snapshot' aria-describedby='addon-wrapping' required/>
            <div className='invalid-feedback'>Please provide a valid URL.</div>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary movie-form-btn">Update</button>
                <button type="button" className="btn btn-danger movie-form-btn" onClick={() => navigate('/')}>Cancel</button>
            </div>
        </form>
    );
}

export default UpdateMovieForm;
//wondering why this didnt push