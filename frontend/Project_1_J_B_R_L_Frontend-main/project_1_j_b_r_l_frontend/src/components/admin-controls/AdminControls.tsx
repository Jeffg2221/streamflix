import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AdminControls.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AdminControls() {
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
                    navigateTo('/admin-controls');
                }
            }
        }
    
        checkForAdminUser();
    }, []);

  return (
    <div className="movie-form">
    <h1 className="movie-form-header rounded-2">AdminControls</h1>
    <div className="form-outer-container" >
        
        <div className="list-group form-inner-container">
            <Link to="/admin-controls/createmovie" className="list-group-item list-group-item-action list-group-item-primary admin-selection">Create New Movie</Link>
            <Link to="/admin-controls/movies" className="list-group-item list-group-item-action list-group-item-primary admin-selection">Edit Movies</Link>
            <Link to="/admin-controls/users" className="list-group-item list-group-item-action list-group-item-primary admin-selection">User Records</Link>
            <Link to="/admin-controls/user-movies" className="list-group-item list-group-item-action list-group-item-primary admin-selection">Purchased Movies Records</Link>
        </div>
        
    </div>
    </div>
  )
}

export default AdminControls