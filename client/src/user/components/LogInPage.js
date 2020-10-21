import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import LightBulbOn from 'mdi-react/LightbulbOnOutlineIcon';
import useForm from '../../hooks/form-hook';
import './SignUp-LogInPages.css';

const LogInPage = () => {

  const authSubmitHndler = () => {
    console.log(values);
  };

  const [values, handleChange, submitHandler] = useForm(authSubmitHndler);

  return (
    <Fragment>
      <Helmet><title>Math-Quiz App - SignUp</title></Helmet>
      <section>
        <div style={{ textAlign: 'center' }}>
          <LightBulbOn color="orange" size={'8rem'} />
        </div>
        <h1>Welcome to Math Quiz App</h1>
        <form onSubmit={submitHandler}>
          <input type="email" name='email' placeholder='email' value={values.email || ''} onChange={handleChange} className='inputForm' />
          <input type="password" name='password' placeholder='password' value={values.password || ''} onChange={handleChange} className='inputForm' />
          <div className='login-btn-container'>
            <button className='login-btn btn'>LogIn</button>
          </div>
        </form>
      </section>
    </Fragment >
  );
};




export default LogInPage;