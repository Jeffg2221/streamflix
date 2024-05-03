import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './form.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ResetPasswordForm() {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const navigateTo = useNavigate();

    useEffect(() => {
        let asyncCall = async() => {
            try {
                let validateSession = await axios.get(`http://localhost:8080/users/session`,  
                {withCredentials: true})
                if (validateSession.status === 401) {
                    navigateTo(`/`);
                }
                console.log(validateSession);

            } catch (error: any) {
                console.error(error);
                if (error.response.status === 401) {
                    navigateTo(`/`);
                }
            }
        }
        asyncCall();
    }, []);

    let setPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    let setConfirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }

    let resetPassword = async(e: React.FormEvent) => {
        e.preventDefault();
        if(password === '') { 
            document.querySelector('.alert-container')!.innerHTML =`<div class="alert alert-danger" role="alert"><strong>Oh no! </strong>Please enter a password.</div>`
            return;
        }
        if(confirmPassword === '') { 
            document.querySelector('.alert-container')!.innerHTML =`<div class="alert alert-danger" role="alert"><strong>Oh no! </strong>Please confirm your password.</div>`
            return;
        }
        if(password !== confirmPassword) { 
            document.querySelector('.alert-container')!.innerHTML =`<div class="alert alert-danger" role="alert"><strong>Oh no! </strong>Passwords do not match.</div>`
            return;
        }
        let res = await axios.patch(`http://localhost:8080/users/resetPassword`, {
            password: password
        }, {withCredentials: true})
        .then((response) => {
            console.log(response);
            document.querySelector('.alert-container')!.innerHTML =`<div class="alert alert-success" role="alert"><strong>Well done! </strong>${response.data}</div>`
            navigateTo(`/users/login`);
        })
        .catch((error) => {
            console.error(error);
            document.querySelector('.alert-container')!.innerHTML =`<div class="alert alert-danger" role="alert"><strong>Oh no! </strong>${error.response.data}</div>`
        });
    }

  return (
    <div className='form-outer-container'>
        
        <form className='mb-3 form-inner-container'>
            <h1 className="form-header">Reset Password</h1>
            <hr />
            <div className='alert-container'></div>
            <p>Enter your new password. Make sure to make it larger than four characters.</p>
            <label className="form-label"htmlFor='new-password'>New Password</label>
            <input onChange={setPasswordHandler} className="form-control" id="new-password" type="password" name="password" />
            <label className="form-label" htmlFor='new-password-2'>Confirm New Password</label>
            <input onChange={setConfirmPasswordHandler} className="form-control" id="new-password-2" type="password" name="confirm-password" />
            <div className='d-grid gap-2 submit-form-button'>
                <button type="submit" className="btn btn-primary"onClick={resetPassword}>Reset Password</button>
            </div>
        </form>
    </div>
  )
}

export default ResetPasswordForm