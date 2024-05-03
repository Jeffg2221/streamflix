import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'

export interface IRegisterProps {
  username: string,
  password: string,
  name: string,
  email: string,
  // admin: boolean
}

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  // const [isAdmin, setIsAdmin] = useState(false)
  const [className, setClassName] = useState('empty');
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  // const handleIsAdminChange = () => {
  //   setIsAdmin(!isAdmin)
  // }

  const handleRegister = async () => {
    const newUser: IRegisterProps = {
      username: username,
      password: password,
      name: name,
      email: email,
      // admin: isAdmin
    }
    console.log(newUser)
   
     let response = await axios.post('http://localhost:8080/users/register', newUser, {withCredentials: true})
     .then((response) => {
            console.log(response.status)
            localStorage.setItem("username", response.data.username)
            localStorage.setItem("admin", response.data.admin)
            return response})
      .catch((error) => {
        localStorage.removeItem('user')
        localStorage.removeItem('admin')
        // alert(`Cannot register new user: ${error.response.data}`);
        setClassName('error');
        return error.response
      })
    if (response.status === 201) {
      console.log('User Registered')
      setError('User Registered')

      navigate('/movies')
      
    } else {
      setError(response.data)
      console.log(response.data)
    }
  }

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div>
        <div className='card'>
          <h1 className="card-header">Register</h1>
          <div className="card-body">
            <form>
              <h4 className={className}>{error}</h4> 
              <div className="form-group">
                <label htmlFor='usernameInput'>Username:</label>
                <input id='usernameInput' type='text' className="form-control" onChange={handleUsernameChange} />
              </div>
              <div className='form-group'>
                <label htmlFor='passwordInput'>Password:</label>
                <input id='passwordInput' type='password' className="form-control" onChange={handlePasswordChange} />
              </div>
              <div className='form-group'>
                <label htmlFor='nameInput'>Name:</label>
                <input id='nameInput' type='text' className="form-control" onChange={handleNameChange} />
              </div>
              <div className='form-group'>
                <label htmlFor='emailInput'>Email:</label>
                <input id='emailInput' type='text' className="form-control" onChange={handleEmailChange} />
              </div>
              {/* <div className='form-group'>
                <label htmlFor='isAdminInput'>Is Admin:</label>
                <input id='isAdminInput' type='checkbox' onClick={handleIsAdminChange} />
              </div> */}
              <button className="btn btn-primary" onClick={handleRegister} type='submit'>Register!</button>
            </form>
          </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default Register