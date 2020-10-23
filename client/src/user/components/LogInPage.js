import React, { Fragment, useContext } from 'react';
import { Helmet } from 'react-helmet';
import LightBulbOn from 'mdi-react/LightbulbOnOutlineIcon';
import useForm from '../../hooks/form-hook';
import './SignUp-LogInPages.css';
import useHttpClient from '../../hooks/http-hook';
import { AuthContext } from '../../shared/Ath-context';
import LoadingGif from '../../images/giphy/loading.gif';
import ErrorGif from '../../images/giphy/error.gif';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from '../../shared/validarors';

const LogInPage = () => {
  const auth = useContext(AuthContext);
  const [values, handleChange] = useForm();

  const { isLoading, error, sendRequest } = useHttpClient();

  const authSubmitHndler = async (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_BACKEND_URL}/login`;

    const body = {
      email: values.email,
      password: values.password,
    };

    const request = {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };

    let loginUser;

    try {
      loginUser = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers
      );

      auth.login(loginUser.userId, loginUser.role, loginUser.token);

    } catch (err) {
      console.log("can't login user", err);
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
              <input type="email" name='email' placeholder='email' value={values.email || ''} onChange={handleChange} className='inputForm' validators={[VALIDATOR_EMAIL()]} />
              <input type="password" name='password' placeholder='password' value={values.password || ''} onChange={handleChange} className='inputForm' validators={[VALIDATOR_MINLENGTH(6)]} />
              <div className='login-btn-container'>
                <button type='submit' className='login-btn btn'>LogIn</button>
              </div>
            </form>
          </section>
        </Fragment>)}
    </Fragment >
  );
};

export default LogInPage;