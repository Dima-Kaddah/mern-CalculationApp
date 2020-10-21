import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import LightBulbOn from 'mdi-react/LightbulbOnOutlineIcon';
import mathGif from '../../images/giphy/math2.gif';
import './HomePage.css';

const HomePage = () => (
  <Fragment>
    <Helmet><title>Math-Quiz App - Home</title></Helmet>
    <div className='card'>
      <div style={{ textAlign: 'center' }}>
        <LightBulbOn color="orange" size={'8rem'} />
      </div>
      <h1>Welcome to Math Quiz App</h1>
      <div style={{ textAlign: 'center' }}>
        <img src={mathGif} alt="light" />
      </div>
      <div className='signup-btn-container'>
        <Link to='/signup' className='signup-btn btn' >SignUp</Link>
      </div>
      <div className='login-btn-container'>
        <Link to='/login' className='login-btn btn' >LogIn</Link>
      </div>
    </div>
  </Fragment >
);


export default HomePage;