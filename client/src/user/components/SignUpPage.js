import React, { Fragment, useContext } from 'react';
import { Helmet } from 'react-helmet';
import useForm from '../../hooks/form-hook';
import LightBulbOn from 'mdi-react/LightbulbOnOutlineIcon';
import './SignUp-LogInPages.css';
import useHttpClient from '../../hooks/http-hook';
import { AuthContext } from '../../shared/Ath-context';
import LoadingGif from '../../images/giphy/loading.gif';
import ErrorGif from '../../images/giphy/error.gif';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from '../../shared/validarors';

const SignUpPage = () => {
  const auth = useContext(AuthContext);
  const [values, handleChange] = useForm();

  const { isLoading, error, sendRequest } = useHttpClient();

  const authSubmitHndler = async (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_BACKEND_URL}/signup`;

    const body = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    const request = {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };

    let createUser;

    try {
      createUser = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers
      );

      auth.login(createUser.userId, createUser.role, createUser.token);

    } catch (err) {
      console.log("can't create user", err);
    }
  };
  return (
    <Fragment>
      {isLoading && <img src={LoadingGif} alt="Loading" />}
      {error && <img src={ErrorGif} alt="Error" />}
      {!isLoading && !error && (
        <Fragment>
          <Helmet><title>Math-Quiz App - SignUp</title></Helmet>
          <section>
            <div style={{ textAlign: 'center' }}>
              <LightBulbOn color="orange" size={'8rem'} />
            </div>
            <h1>Welcome to Math Quiz App</h1>
            <form onSubmit={authSubmitHndler}>
              <input type="name" name='name' placeholder='name' value={values.name || ''} onChange={handleChange} className='inputForm' autoFocus />
              <input type="email" name='email' placeholder='email' value={values.email || ''} onChange={handleChange} className='inputForm' validators={[VALIDATOR_EMAIL()]} />
              <input type="password" name='password' placeholder='password' value={values.password || ''} onChange={handleChange} className='inputForm' validator={[VALIDATOR_MINLENGTH(6)]} />
              <div className='signup-btn-container'>
                <button type='submit' className='signup-btn btn'>SignUp</button>
              </div>
            </form>
          </section>
        </Fragment>)}
    </Fragment >

  );
};


export default SignUpPage;