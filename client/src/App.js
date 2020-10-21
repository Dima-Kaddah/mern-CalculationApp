import React, { useState, useCallback, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PlayStartPage from './questions/pages/PlayStartPage';
import LoadingGif from '../src/images/giphy/loading.gif';
import HomePage from './user/components/HomePage';
import SignUpPage from './user/components/SignUpPage';
import LogInPage from './user/components/LogInPage';
import { AuthContext } from './shared/Ath-context';

const QuestionsPage = React.lazy(() => import('./questions/pages/QuestionsPage.js'));

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route exact path='/play' component={PlayStartPage} />
        <Route exact path='/QuestionCard' component={QuestionsPage} />
        <Redirect to="/play" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signup' component={SignUpPage} />
        <Route exact path='/login' component={LogInPage} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <Suspense fallback={<img src={LoadingGif} alt="Loading" />}>
        <Router>
          {routes}
        </Router>
      </Suspense>
    </AuthContext.Provider >

  );
};

export default App;
