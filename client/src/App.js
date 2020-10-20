import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import HomePage from './questions/pages/HomePage';
import LoadingGif from '../src/images/giphy/loading.gif';

const QuestionsPage = React.lazy(() => import('./questions/pages/QuestionsPage.js'));

const App = () => {
  return (
    <Suspense fallback={<img src={LoadingGif} alt="Loading" />}>
      <Router>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/QuestionCard' component={QuestionsPage} />
        <Redirect to='/' />
      </Router>
    </Suspense>

  );
};

export default App;
