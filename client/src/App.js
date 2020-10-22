import React, { useState, useCallback, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PlayStartPage from './questions/pages/PlayStartPage';
import LoadingGif from '../src/images/giphy/loading.gif';
import HomePage from './user/components/HomePage';
import SignUpPage from './user/components/SignUpPage';
import LogInPage from './user/components/LogInPage';
import { AuthContext } from './shared/Ath-context';
import { LevelContext } from './shared/Level-context.js';
const QuestionsPage = React.lazy(() => import('./questions/pages/QuestionsPage.js'));

const App = () => {
  const [token, setToken] = useState(false);
  const [gameLevel, setGameLevel] = useState('');

  const login = useCallback((token) => {
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  let routes;

  if (token) {
    routes = (
      <Switch>

      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path='/play' component={PlayStartPage} />
        <Route exact path='/QuestionCard' component={QuestionsPage} />
        {/* <Redirect to="/play" /> */}
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signup' component={SignUpPage} />
        <Route exact path='/login' component={LogInPage} />
        <Redirect to="/" />
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
