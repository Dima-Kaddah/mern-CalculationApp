import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import useForm from '../../hooks/form-hook';
import LightBulbOn from 'mdi-react/LightbulbOnOutlineIcon';
import './SignUp-LogInPages.css';
// import useHttpClient from '../../hooks/http-hook';

const SignUpPage = () => {

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
          <input type="name" name='name' placeholder='name' value={values.name || ''} onChange={handleChange} className='inputForm' autoFocus />
          <input type="email" name='email' placeholder='email' value={values.email || ''} onChange={handleChange} className='inputForm' />
          <input type="password" name='password' placeholder='password' value={values.password || ''} onChange={handleChange} className='inputForm' />
          <div className='signup-btn-container'>
            <button type='submit' className='signup-btn btn'>SignUp</button>
          </div>
        </form>
      </section>
    </Fragment >

  );
};


export default SignUpPage;