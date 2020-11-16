import React, { Fragment, useContext } from 'react';
import { Helmet } from 'react-helmet';
import useForm from '../../hooks/form-hook';
import LightBulbOn from 'mdi-react/LightbulbOnOutlineIcon';
import './SignUp-LogInPages.css';
import useHttpClient from '../../hooks/http-hook';
import { AuthContext } from '../../shared/Ath-context';
import LoadingGif from '../../images/giphy/loading.gif';
import { validateSignUp } from '../../shared/validate';
import ErrorModal from '../../hooks/ErrorModal';


const SignUpPage = () => {
  const auth = useContext(AuthContext);
  const [values, handleChange, handlerSubmit, errors] = useForm(authSubmitHandler, validateSignUp);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  async function authSubmitHandler() {
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
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <img src={LoadingGif} alt="Loading" />}
      {!isLoading && !error && (
        <Fragment>
          <Helmet><title>Math-Quiz App - SignUp</title></Helmet>
          <section>
            <div style={{ textAlign: 'center' }}>
              <LightBulbOn color="orange" size={'8rem'} />
            </div>
            <h1>Welcome to Math Quiz App</h1>
            <form onSubmit={handlerSubmit}>
              <input type='name' name='name' placeholder='name' value={values.name || ''} onChange={handleChange} className={`${errors.name ? 'inputErr inputForm' : 'inputForm'}`} autoFocus />
              {errors.name && <p className='valErr'>{errors.name}</p>}
              <input type='email' name='email' placeholder='email' value={values.email || ''} onChange={handleChange} className={`${errors.email ? 'inputErr inputForm' : 'inputForm'}`} />
              {errors.email && <p className='valErr'>{errors.email}</p>}
              <input type='password' name='password' placeholder='password' value={values.password || ''} onChange={handleChange} className={`${errors.password ? 'inputErr inputForm' : 'inputForm'}`} />
              {errors.password && <p className='valErr'>{errors.password}</p>}
              <div className='signup-btn-container'>
                <button type='submit' className='signup-btn btn'>SignUp</button>
              </div>
            </form>
          </section>
        </Fragment>)}
    </Fragment >

  );
};

export default SignUpPage;;