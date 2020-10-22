import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import Form from '../components/Form';
import useHttpClient from '../../hooks/http-hook';
import './QuestionsPage.css';
import RightAnswer from '../../images/giphy/RightAnswer.gif';
import tryAgain from '../../images/giphy/tryAgain.gif';
import loseGif from '../../images/giphy/youLose.gif';
import youWinGif from '../../images/giphy/youWin.gif';
import LoadingGif from '../../images/giphy/loading.gif';
import ErrorGif from '../../images/giphy/error.gif';
import { LevelContext } from '../../shared/Level-context';

const QuestionsPage = () => {
  const [answer, setAnswer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  //gif states
  const [gifCorrect, setGifCorrect] = useState(false);
  const [gifTryAgain, setGifTryAgain] = useState(false);
  const [gifLose, setGifLose] = useState(false);
  const [gifWIn, setGifWin] = useState(false);

  const { gameLevel, setGameLevel } = useContext(LevelContext);
  const { isLoading, error, sendRequest } = useHttpClient();

  const getQuestion = async (url) => {
    const data = await sendRequest(url);
    setQuestions(data);
  };
  const postAnswer = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/checkAnswer`;
    const body = {
      _id: questions[index]._id,
      rightCount: correctAnswer,
      triesCount: wrongAnswer,
      answer,
    };
    const request = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };
    let checkAnswer;
    try {
      checkAnswer = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers
      );
    } catch (err) {
      console.log("can't get answer", err);
    }
    if (checkAnswer.answer === true && checkAnswer.rightCount < 5) {
      setCorrectAnswer(correctAnswer + 1);
      setIndex(index + 1);
      setGifCorrect(true);

    } else if (checkAnswer.answer === true && checkAnswer.rightCount <= 5) {
      setGifWin(true);
      setGameLevel('');

    } else if (checkAnswer.answer === false && checkAnswer.triesCount < 3) {
      setGifTryAgain(true);
      setWrongAnswer(wrongAnswer + 1);

    } else if (checkAnswer.answer === false && wrongAnswer <= 3) {
      setGifLose(true);
      setGameLevel('');

    }


  };
  useEffect(() => {
    getQuestion(`${process.env.REACT_APP_BACKEND_URL}/allQuestions`);
  }, [index]);

  useEffect(() => {
    setTimeout(() => {
      setGifCorrect(false);
      setGifTryAgain(false);
    }, 3500);
  }, [correctAnswer, wrongAnswer]);

  const handleChange = e => setAnswer(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    postAnswer();
    setAnswer('');

  };
  return (
    <Fragment>
      <Helmet><title> math-Quiz App - play </title></Helmet>
      <div className='card'>
        {isLoading && <img src={LoadingGif} alt="Loading" />}
        {error && <img src={ErrorGif} alt="Error" />}
        {gifCorrect && <img src={RightAnswer} alt="correct" />}
        {gifTryAgain && <img src={tryAgain} alt="tryAgain" />}
        {gifLose && <img src={loseGif} alt="lose" />}
        {gifWIn && <img src={youWinGif} alt="win" />}

        {questions.length && !isLoading && !gifCorrect && !gifTryAgain && !gifLose && !gifWIn && (
          <React.Fragment>
            <h1>Math Quiz App {gameLevel}</h1>
            <h1>Question {questions[index].index}/{questions.length} </h1>
            <div key={questions[index]._id}>
              <div className='questionData'>{`${questions[index].question}`}
              </div>
            </div>
            <Form handleSubmit={handleSubmit} answer={answer} onChange={handleChange} />
          </React.Fragment>
        )
        }
      </div>
    </Fragment >
  );

};
export default QuestionsPage;


