import React, { Fragment, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import LightBulbOn from 'mdi-react/LightbulbOnOutlineIcon';
import './PlayStartPage.css';
import { LevelContext } from '../../shared/Level-context';
import LogoutBtn from './../components/LogoutBtn';

const PlayStartPage = () => {
  const { gameLevel, setGameLevel } = useContext(LevelContext);

  const [level, setLevel] = useState('SELECT LEVEL');

  const onChangeHandler = (e) => {
    setLevel(e.target.value);
    setGameLevel(e.target.value);

  };

  const fetchLevel = (e) => {
    e.preventDefault();
    console.log(gameLevel);
  };

  return (
    <Fragment>
      <Helmet><title>Math-Quiz App - play/level</title></Helmet>
      <section>
        <LogoutBtn />
        <h1>Select<LightBulbOn color="orange" size={'5rem'} />Level</h1>
        <form onSubmit={fetchLevel}>
          <select className='select' onChange={onChangeHandler}>
            <option className='select' value='SELECT LEVEL'>SELECT LEVEL</option>
            <option className='select' value='EASY'>EASY</option>
            <option className='select' value='NORMAL'>NORMAL</option>
            <option className='select' value='HARD'>HARD</option>
          </select>
          <div className='start-btn-container'>
            {level === 'SELECT LEVEL' ? <Redirect to='/play' /> : (
              <Link to='/QuestionCard' className='start-btn btn'> {level}  PLAY </Link>
            )}

          </div>
        </form>
      </section>
    </Fragment >);
};


export default PlayStartPage;