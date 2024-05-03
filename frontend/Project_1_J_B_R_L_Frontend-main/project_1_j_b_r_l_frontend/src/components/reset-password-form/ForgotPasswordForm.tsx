import React, {MouseEvent} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './form.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ForgotPasswordForm() {
    const [email, setEmail] = React.useState('');
    const navigateTo = useNavigate();

    let setEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    let sendEmail = async(e: MouseEvent) => {
        e.preventDefault();
        if(email === '') { 
            document.querySelector('.alert-container')!.innerHTML =`<div class="alert alert-danger" role="alert"><strong>Oh no! </strong>Please enter an email address.</div>`
            return;
        }
        let res = await axios.post(`http://localhost:8080/users/${email}/forgotPassword`)
        .then((response) => {
            console.log(response);
            document.querySelector('.alert-container')!.innerHTML =`<div class="alert alert-success" role="alert"><strong>Well done! </strong>${response.data}</div>`
            navigateTo(`/users/reset-password/otp/${email}`);
        })
        .catch((error) => {
            console.error(error);
            document.querySelector('.alert-container')!.innerHTML =`<div class="alert alert-danger" role="alert"><strong>Oh no! </strong>${error.response.data}</div>`
        });
    }

  return (
    <div className="form-outer-container">
        
        <form className='mb-3 form-inner-container'>
            <h1 className='form-header'>Forgot Your Password?</h1>
            <hr />
            <div className='alert-container'></div>
            <p>Don't worry! It happens to the best of us.</p>
            <p>Enter your email address and we'll send you a link with instructions on how to reset your password.</p>
            <input type="email" onChange={setEmailHandler} className="form-control form-input-box" id="email" placeholder='name@example.com' />
            <div className='d-grid gap-2'>
                <button type="submit" onClick={(e) => sendEmail(e)} className="btn btn-primary" id="email-button">Send Email</button>
            </div>
        </form>        
    </div>
  )
}

export default ForgotPasswordForm