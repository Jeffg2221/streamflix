import axios from 'axios';
import "./MoneyButton.css";
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MoneyButton(){
    const [amount, setAmount] = useState(0);
    const [text, setText] = useState('');
    const [className, setClassName] = useState('');
    const [balance, setBalance] = useState(0);

    let updateAmount = (e: SyntheticEvent) => {
        setAmount(parseFloat((e.target as HTMLInputElement).value))
    }  
    
    const handleButtonClick = async (e: SyntheticEvent) => {
        // setAmount(Number((document.getElementById('amount') as HTMLInputElement).value));
        e.preventDefault();
        if (!amount) {
            setClassName('failure');
            setText('Please enter a valid amount');
            return;
        }

        try {
        const response = await axios.patch('http://localhost:8080/users/addMoney', {balance: amount},
            {withCredentials: true});

                if (response.status === 200) {
                    // Handle successful response
                    console.log('PATCH request sent successfully');
                    setClassName('success');
                    setBalance(balance + amount);
                    setText('$' + amount.toFixed(2) + ' added to your account');
                } else {
                    // Handle error response
                    console.error('Failed to send PATCH request');
                    console.log(response.status);
                    setClassName('failure');
                    setText('Failed to add money to your account');
                }
        } catch (error) {
            // Handle network error
            console.error('Network error occurred', error);
            setClassName('failure');
            setText('Failed to add money to your account');
        }
        setAmount(0);
};
    let navigateTo = useNavigate();
    useEffect(() => {
        
        let checkForLoggedInUser = async () => {
            try {
                let res = await axios.get('http://localhost:8080/users/session', {
                    withCredentials: true
                });
                setBalance(res.data.balance);
            } catch (error : any) {
                let status = error.response.status;
                if (status === 401) {
                    console.log("Session is invalid");
                    navigateTo('/users/login');
                }
            }
            console.log("hello world")
        }
    
        checkForLoggedInUser();
    }, [])

    return (
        <div className='movie-form'>
            <label htmlFor="amount" className ="movie-label">Amount: {balance}</label>
            <input onChange={updateAmount} value={amount} type="number" id="amount" name="amount"/>
            <button onClick={handleButtonClick} className="btn btn-primary">
                Add Money
            </button>
            <h2 className={className}>{text}</h2>
        </div>
    );
};

export default MoneyButton;