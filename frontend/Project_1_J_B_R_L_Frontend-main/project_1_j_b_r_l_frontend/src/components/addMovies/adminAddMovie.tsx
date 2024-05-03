import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Movie } from '../../models/movie';


const AdminAddMovie: React.FC = () => {
    const [movie, setMovie] = useState<Movie>({
        movieId: 0,
        name: '',
        price: 0,
        url: '',
        description: ''
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setMovie((prevMovie: Movie) => ({
            ...prevMovie,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            console.log(movie);
            const response = await axios.post('http://localhost:8080/movies', movie, {
                withCredentials: true
            });
            console.log(response.data);
            // Handle the response from the server
        } catch (error) {
            // Handle any errors that occur during the request
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add Movie</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="name"
                        value={movie.name}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={movie.price}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Url:</label>
                    <input
                        type="text"
                        name="url"
                        value={movie.url}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={movie.description}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Movie</button>
            </form>
        </div>
    );
};

export default AdminAddMovie;