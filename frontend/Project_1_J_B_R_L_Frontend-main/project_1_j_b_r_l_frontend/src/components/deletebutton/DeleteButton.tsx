import axios from 'axios';
import React from 'react'

interface DeleteButtonProps {
    id: number;
    isAdmin : boolean;
    setMovies: React.Dispatch<React.SetStateAction<any[]>>;
}

function DeleteButton(props: DeleteButtonProps) {
    const handleButtonClick = async () => {

        try {
        const response = await axios.delete('http://localhost:8080/movies/' +props.id, 
            {withCredentials: true});

                if (response.status === 200) {
                    // Handle successful response
                    console.log('DELETE request sent successfully');
                } else {
                    // Handle error response
                    console.error('Failed to send DELETE request');
                    console.log(response.status);
                }
        } catch (error) {
            // Handle network error
            console.error('Network error occurred', error);
        }
        props.setMovies((prevMovies) => {
            return prevMovies.filter((movie) => {
                return movie.movieId !== props.id;
            });
        });
}
    return (
        props.isAdmin ? <button onClick={handleButtonClick} className="btn btn-primary">Delete Movie</button>:null
      
    )
}

export default DeleteButton
