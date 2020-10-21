import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PlayStartPage from './questions/pages/PlayStartPage';
import LoadingGif from '../src/images/giphy/loading.gif';
import HomePage from './user/components/HomePage';
import SignUpPage from './user/components/SignUpPage';
import LogInPage from './user/components/LogInPage';


const QuestionsPage = React.lazy(() => import('./questions/pages/QuestionsPage.js'));

const App = () => {
  return (
    <Suspense fallback={<img src={LoadingGif} alt="Loading" />}>
      <Router>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/play' component={PlayStartPage} />
        <Route exact path='/QuestionCard' component={QuestionsPage} />
        <Route exact path='/signup' component={SignUpPage} />
        <Route exact path='/login' component={LogInPage} />

      </Router>
    </Suspense>

  );
};

export default App;
