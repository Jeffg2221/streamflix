import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('empty');
    const [text, setText] = useState('');
    const navigate = useNavigate();

    let updateUsername= (e: SyntheticEvent) => {
        setUsername((e.target as HTMLInputElement).value)
    }

    let updatePassword = (e: SyntheticEvent) => {
        setPassword((e.target as HTMLInputElement).value)
    }

    let login = async(e: React.FormEvent) => {
        e.preventDefault();

        let res = await axios.post('http://localhost:8080/users/login', {
            username: username,
            password: password
        }, {withCredentials: true})
        .then((response) => {
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("admin", response.data.admin);
            setUsername('');
            setPassword('');
            navigate("/movies");
        })
        .catch((error) => {
            localStorage.removeItem("username");
            localStorage.removeItem("admin");
            console.error(error);
            setClassName('error');
            setText('Invalid username or password');
        });
    }

    let navigateTo = useNavigate();

    useEffect(() => {
        let checkForLoggedInUser = async () => {
            try {
                let res = await axios.get('http://localhost:8080/users/session', {
                    withCredentials: true
                });
            } catch (error : any) {
                let status = error.response.status;
                if (status === 401) {
                    console.log("Session is invalid");
                    navigateTo('/users/login');
                }
            }
        }
    
        checkForLoggedInUser();
    }, []);
    
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card">
                <h1 className="card-header">Login</h1>
                <div className="card-body">
                    <form>
                        <h4 className={className}>{text}</h4>
                        <div className="form-group">
                            <label>Username</label>
                            <input onChange={updateUsername} type="text" name="username" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input onChange={updatePassword} type="password" name="password" className="form-control" />
                        </div>
                        <button type="submit" onClick={login} className="btn btn-primary">Login</button>
                    </form>
                    <p><Link to="/users/forgot-password" className="link-underline-info">Forgot Password?</Link></p>
                </div>
            </div>
        </div>
    )
}



export default LoginForm;