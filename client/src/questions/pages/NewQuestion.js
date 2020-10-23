import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './QuestionsPage.css';
import LogoutBtn from './../components/LogoutBtn';

const NewQuestion = () => {

  return (
    <Fragment>
      <Helmet><title>Math-Quiz App - Admin-newQuesion</title></Helmet>
      <section>
        <LogoutBtn />
        <h1>Hey Admin!</h1>
        <h1> you just add new Question <Link to='/addQuestions' ><button className='logout-btn'>Add more</button></Link></h1>

      </section>
    </Fragment>

  );

};
export default NewQuestion;
