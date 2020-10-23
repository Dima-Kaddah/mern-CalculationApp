import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import useForm from '../../hooks/form-hook';
import useHttpClient from '../../hooks/http-hook';
import './QuestionsPage.css';
import LogoutBtn from './../components/LogoutBtn';
import LoadingGif from '../../images/giphy/loading.gif';
import ErrorGif from '../../images/giphy/error.gif';

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from '../../shared/validarors';

const QuestionAdmin = () => {
  const [newQuestion, setNewQuestion] = useState({});
  const [values, handleChange] = useForm();

  const { isLoading, error, sendRequest } = useHttpClient();

  const history = useHistory();

  const authSubmitHndler = async (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_BACKEND_URL}/addQuestion`;

    const body = {
      index: values.index,
      question: values.question,
      answer: values.answer,
      role: values.role,
    };

    const request = {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };

    let createQuestion;

    try {
      createQuestion = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers
      );

      history.push('/newQuestion');
      setNewQuestion(createQuestion);
    } catch (err) {
      console.log("can't create user", err);
    }
  };
  console.log(newQuestion);

  return (
    <Fragment>
      {isLoading && <img src={LoadingGif} alt="Loading" />}
      {error && <img src={ErrorGif} alt="Error" />}
      {!isLoading && !error && (
        <Fragment>
          <Helmet><title>Math-Quiz App - Admin</title></Helmet>
          <section>
            <LogoutBtn />
            <h1>Hello Admin! this is add Question page :)</h1>
            <form onSubmit={authSubmitHndler}>
              <input type="number" name='index' placeholder='QNumber' value={values.index || ''} onChange={handleChange} className='inputForm' autoFocus />
              <input type="text" name='question' placeholder='Question' value={values.question || ''} onChange={handleChange} className='inputForm' validators={[VALIDATOR_EMAIL()]} />
              <input type="text" name='answer' placeholder='Answer' value={values.answer || ''} onChange={handleChange} className='inputForm' validator={[VALIDATOR_MINLENGTH(6)]} />
              <input type="text" name='role' placeholder='Level' value={values.role || ''} onChange={handleChange} className='inputForm' validator={[VALIDATOR_MINLENGTH(6)]} />
              <div className='signup-btn-container'>
                <button type='submit' className='signup-btn btn'>Add Question</button>
              </div>
            </form>
          </section>
        </Fragment>)}
    </Fragment >

  );

};
export default QuestionAdmin;
