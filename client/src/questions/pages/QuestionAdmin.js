import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import useForm from '../../hooks/form-hook';
import useHttpClient from '../../hooks/http-hook';
import './QuestionsPage.css';
import LogoutBtn from './../components/LogoutBtn';
import LoadingGif from '../../images/giphy/loading.gif';
import ErrorGif from '../../images/giphy/error.gif';
import ErrorModal from '../../hooks/ErrorModal';

const QuestionAdmin = () => {
  const [newQuestion, setNewQuestion] = useState({});
  const [values, handleChange] = useForm();
  const [level, setLevel] = useState('SELECT LEVEL');

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const authSubmitHndler = async (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_BACKEND_URL}/addQuestion`;

    const body = {
      index: values.index,
      question: values.question,
      answer: values.answer,
      role: level,
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

  const onChangeHandler = (e) => {
    setLevel(e.target.value);
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <img src={LoadingGif} alt="Loading" />}
      {!isLoading && !error && (
        <Fragment>
          <Helmet><title>Math-Quiz App - Admin</title></Helmet>
          <section>
            <LogoutBtn />
            <h1>Hello Admin! this is add Question page :)</h1>
            <form onSubmit={authSubmitHndler}>
              <input type="number" name='index' placeholder='0' value={values.index || ''} onChange={handleChange} className='select' autoFocus />
              <input type="text" name='question' placeholder='Question' value={values.question || ''} onChange={handleChange} className='select' />
              <input type="text" name='answer' placeholder='Answer' value={values.answer || ''} onChange={handleChange} className='select' />
              <select className='select' onChange={onChangeHandler}>
                <option className='select' value='SELECT LEVEL'>SELECT LEVEL</option>
                <option className='select' value='EASY'>EASY</option>
                <option className='select' value='NORMAL'>NORMAL</option>
                <option className='select' value='HARD'>HARD</option>
              </select>
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
