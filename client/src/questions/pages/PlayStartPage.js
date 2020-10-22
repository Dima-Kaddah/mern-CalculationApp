import React, { Fragment, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import LightBulbOn from 'mdi-react/LightbulbOnOutlineIcon';
import './PlayStartPage.css';
import { LevelContext } from '../../shared/Level-context';

const PlayStartPage = () => {
  const { gameLevel, setGameLevel } = useContext(LevelContext);

  const [level, setLevel] = useState('');

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
        <h1>Select<LightBulbOn color="orange" size={'8rem'} /> Level</h1>
        <form onSubmit={fetchLevel}>
          <select className='select' onChange={onChangeHandler}>
            <option className='select' value="EASY">EASY</option>
            <option className='select' value="NORMAL">NORMAL</option>
            <option className='select' value="HARD">HARD</option>
          </select>
          <div className='start-btn-container'>
            <Link to='/QuestionCard' className='start-btn btn'> {level} PLAY </Link>
          </div>
        </form>
      </section>
    </Fragment >);
};


export default PlayStartPage;