import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FrontPage.css';
//import svg from '../../StreamFlix.svg';
import sflogo from '../../SF-logo-no-bg.png';

const FrontPage: React.FC = () => {
    let navigateTo = useNavigate();
    useEffect(() => {
        let checkForLoggedInUser = async () => {
            try {
                let res = await axios.get('http://localhost:8080/users/session', {
                    withCredentials: true
                });
                navigateTo('/movies');
            } catch (error : any) {
                // let status = error.response.status;
                // if (status === 401) {
                //     console.log("Session is invalid");
                //     navigateTo('/movies');
                // }
            }
        }
    
        checkForLoggedInUser();
    }, []);
    return (
        <div className='center-div'>
            <div className='front-page-container'>
                <img src={sflogo} alt="StreamFlix logo" height="150" width="150" />
                <h1>Welcome to StreamFlix!</h1>
                <p id='watch'>Watch Everything*</p>
                <p id="register">Please register or login to continue.</p>
            <div>
                <Link to="/users/register"><button className="btn btn-primary">Register</button></Link>
                <Link to="/users/login"><button className="btn btn-primary">Login</button></Link>
            </div>
            <p id="disclaimer">*Not actually everything</p>
            </div>
        </div>
    );
};

export default FrontPage;