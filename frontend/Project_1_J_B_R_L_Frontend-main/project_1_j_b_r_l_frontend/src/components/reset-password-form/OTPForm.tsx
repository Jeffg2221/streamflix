import React, { useEffect} from 'react'
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './form.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function OTPForm() {
    const email : string = useParams().email?.toString()??'';
    const [otp, setOtp] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const navigateTo = useNavigate();

    let setOtpHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    }
    let successHandler = () => {
        setSuccess(true);
    }

    let continueToResetPassword = () => {
        navigateTo(`/users/reset-password`);
    }

    let submitOtp = async() => {
        if(otp === '') { 
            document.querySelector('.alert-container')!.innerHTML =`<div class="alert alert-danger" role="alert"><strong>Oh no! </strong>Please enter an OTP.</div>`
            return;
        }
        console.log(otp);
        let res = await axios.post(`http://localhost:8080/users/${email}/verifyEmail/${otp}`, {},{withCredentials: true})
        .then((response) => {
            console.log(response);
            document.querySelector('.alert-container')!.innerHTML =`<div class="alert alert-success" role="alert"><strong>Well done! </strong>You hava successfully verified your account.</div>`
            document.getElementById('otp')!.setAttribute('disabled', 'true');
            var button = document.getElementById('otp-button')!;
            button.classList.remove('btn-primary');
            button.classList.add('btn-success');
            successHandler();
            button.textContent = 'Continue to Reset Password';

        })
        .catch((error) => {
            console.error(error);
            document.querySelector('.alert-container')!.innerHTML =`<div class="alert alert-danger" role="alert"><strong>Oh no! </strong>${error.response.data}</div>`
        });
    }
return (
    <div className="form-outer-container">
            <form className='mb-3 form-inner-container'>
                    <h1 className='form-header'>Enter Your OTP</h1>
                    <hr />
                    <div className='alert-container'></div>
                    <p>Enter the OTP sent to your email address.</p>
                    <input type="email" className="form-control" value={email ? email : ""} id="email" disabled readOnly></input>
                    <input type="text" className="form-control" onChange={setOtpHandler} id="otp" placeholder='Enter OTP'/>
                    <div className='d-grid gap-2 submit-form-button'>
                            <button type="button" className="btn btn-primary" onClick={success?continueToResetPassword:submitOtp} id="otp-button">Submit OTP</button>
                    </div>
            </form>
    </div>
)
}

export default OTPForm