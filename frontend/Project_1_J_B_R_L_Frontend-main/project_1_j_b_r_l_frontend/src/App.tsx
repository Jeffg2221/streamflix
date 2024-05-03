import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UserMovies from './components/userMovies';
import Nav from './components/nav/Nav';
import Register from './components/register/Register';
import GetAllMovies from './components/getallmovies/GetAllMovies';
import GetMovieById from './components/getspecificmovie/GetMovieById';
import MovieForm from './components/movie-form/MovieForm';
import AdminAddMovie from './components/addMovies/adminAddMovie';
import LoginForm from './components/login/LoginForm';
import UpdateMovieForm from './components/updateMovies/updateMovieForm';
import AdminUserMovies from './components/users/AdminUserMovies';
import MyMovies from './components/users/MyMovies';
import ForgotPasswordForm from './components/reset-password-form/ForgotPasswordForm';
import OTPForm from './components/reset-password-form/OTPForm';
import ResetPasswordForm from './components/reset-password-form/ResetPasswordForm';
import GetAllUsers from './components/users/GetAllUsers';
import MoneyButton from './components/moneybutton/MoneyButton';
import FrontPage from './components/frontpage/FrontPage';
import AdminControls from './components/admin-controls/AdminControls';
import './Main.css';


function App() {
  //AdminAuthentication(MovieForm);

  return (
    <>
      
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/admin-controls/movies" Component={UserMovies}></Route>
          <Route path="/" Component={FrontPage}></Route>
          <Route path='/users/register' element={<Register/>}/>
          <Route path='/movies' element={<GetAllMovies/>}/>
          <Route path='/movies/:id' element={<GetMovieById/>}/>
          <Route path='/admin-controls' element={<AdminControls/>}/>
          <Route path='/admin-controls/createmovie' element={<MovieForm/>}/>
          <Route path='/admin-controls/movies/:id' element={<UpdateMovieForm/>}/>
          <Route path='/users/login' element={<LoginForm/>}/> 
          <Route path='/users/forgot-password' element={<ForgotPasswordForm/>}/>
          <Route path='/users/reset-password/OTP/:email' element={<OTPForm/>}/>
          <Route path='/users/reset-password' element={<ResetPasswordForm/>}/>
          <Route path='/users/myMovies' element={<MyMovies/>}/>
          <Route path='/admin-controls/user-movies' element={<AdminUserMovies/>}/>
          <Route path='/admin-controls/users' element={<GetAllUsers/>}/>
          <Route path='/users/addMoney' element={<MoneyButton/>}/>
          <Route path='*' element={<h1>404 Not Found</h1>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
