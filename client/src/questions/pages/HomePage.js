import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import LightBulbOn from 'mdi-react/LightbulbOnOutlineIcon';
import mathGif from '../../images/giphy/math2.gif';
import './HomePage.css';

const HomePage = () => (
  <Fragment>
    <Helmet><title>Math-Quiz App - Home</title></Helmet>
    <section>
      <div style={{ textAlign: 'center' }}>
        <LightBulbOn color="orange" size={'8rem'} />
      </div>
      <h1>Math Quiz App</h1>
      <div style={{ textAlign: 'center' }}>
        <img src={mathGif} alt="light" />
      </div>
      <div className='start-btn-container'>
        <Link to='/QuestionCard' className='start-btn btn'>Start</Link>
      </div>
    </section>
  </Fragment >
);


export default HomePage;