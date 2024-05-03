import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { log } from 'console';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function UserDropdown() {

    const [expanded, setExpanded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [admin, setAdmin] = useState(false);   
    const [username, setUsername] = useState(localStorage.getItem('username'));
    let navigateTo = useNavigate();

    let setExpandedHandler = () => {
        setExpanded(!expanded);
    }

    useEffect(() => {
        let asyncCall = async() => {
            try {
                let validateSession = await axios.get(`http://localhost:8080/users/session`,  
                {withCredentials: true})
                if (validateSession.status === 401) {
                    setLoggedIn(false);
                    setAdmin(false);
                } else {
                    setLoggedIn(true);
                    setAdmin(validateSession.data.admin);
                }

            } catch (error) {
                console.error(error);
            }
        }
        asyncCall();
    }, [window.location.pathname]);

    const presentUser = localStorage.getItem('username') ;
    if (presentUser !== username) {
        setUsername(presentUser);
    }

    let logoutHandler = async() => {
        // make a POST request to the server to log out the user using axios
        // setLoggedIn(false);
        // setAdmin(false);
        let res = await axios.post('http://localhost:8080/users/logout', {}, {
            withCredentials: true
        }).then((res) => {
            localStorage.removeItem("username");
            localStorage.removeItem("admin");
            setAdmin(false);
            setLoggedIn(false);
            setUsername('');
            navigateTo('/');
        }).catch((error: any) => {
            console.error(error);
        })

    }

    return (
        <>
        {loggedIn?
        <div className="dropdown" key={!loggedIn?"lognone":admin?"logadmin":"loguser"}>
            <button className="btn btn-secondary dropdown-toggle" onClick= {setExpandedHandler} type="button" id="accountDropdownMenu" data-bs-toggle="dropdown" aria-expanded={(expanded&& loggedIn)?"true":"false"}>
                {username?username:"Account"}
            </button>
            <ul className="dropdown-menu" id="dropdown-menu" aria-labelledby="accountDropdownMenu">
                <li><Link className="dropdown-item" to="/users/myMovies">My Movies</Link></li>
                <li><Link className="dropdown-item" to="/users/addMoney">Add Funds</Link></li>
                <li><button type="button" className="dropdown-item" onClick={logoutHandler}>Logout</button></li>
                {admin&&<li><hr className='dropdown-divider'></hr></li>}
                {admin&&<li><Link className="dropdown-item" to="/admin-controls">Admin Controls</Link></li>}
            </ul>
        </div>
            :
        <div className="dropdown" key={!loggedIn?"lognone":admin?"logadmin":"loguser"}>
            <button className="btn btn-secondary dropdown-toggle" onClick={setExpandedHandler} type="button" id="signInDropdownMenu" data-bs-toggle="dropdown" aria-expanded={(expanded&&!loggedIn)?"true":"false"}>
                Sign Up
            </button>
            <ul className="dropdown-menu" aria-labelledby="signInDropdownMenu">
                <li><Link to="/users/register"className="dropdown-item">Register</Link></li>
                <li><Link className="dropdown-item" to="/users/login">Login</Link></li>
            </ul>
        </div>
    }      
    </>
    );
}

export default UserDropdown