import React, { useState, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PlayStartPage from './questions/pages/PlayStartPage';
import LoadingGif from '../src/images/giphy/loading.gif';
import HomePage from './user/components/HomePage';
import SignUpPage from './user/components/SignUpPage';
import LogInPage from './user/components/LogInPage';
import { AuthContext } from './shared/Ath-context';
import { LevelContext } from './shared/Level-context.js';
import { useAuth } from './hooks/auth-hook';
const QuestionPage = React.lazy(() => import('./questions/pages/QuestionsPage.js'));
const QuestionAdmin = React.lazy(() => import('./questions/pages/QuestionAdmin.js'));
const NewQuestion = React.lazy(() => import('./questions/pages/NewQuestion.js'));

const App = () => {
  const [gameLevel, setGameLevel] = useState('EASY');
  const { token, login, role, logout } = useAuth();

  let routes;

  if (token && role === 0) {
    routes = (
      <Switch>
        <Route exact path='/play' component={PlayStartPage} />
        <Route exact path='/QuestionCard' component={QuestionPage} />
        <Redirect to='/play' />
      </Switch>
    );
  } else if (!token) {
    routes = (
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signup' component={SignUpPage} />
        <Route exact path='/login' component={LogInPage} />
        <Redirect to='/' />
      </Switch>
    );
  } else if (role === 1) {
    routes = (
      <Switch>
        <Route exact path='/addQuestions' component={QuestionAdmin} />
        <Route exact path='/newQuestion' component={NewQuestion} />
        <Redirect to='/addQuestions' />
      </Switch>
    );

  }
  return (
    <LevelContext.Provider value={{ gameLevel, setGameLevel }}>
      <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, login: login, logout: logout }}>
        <Suspense fallback={<img src={LoadingGif} alt="Loading" />}>
          <Router>
            {routes}
          </Router>
        </Suspense>
      </AuthContext.Provider >
    </LevelContext.Provider>

  );
};

export default App;
