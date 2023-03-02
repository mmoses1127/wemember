import {Switch, Route, Redirect} from 'react-router-dom';
import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import { useSelector } from 'react-redux';
import { getCurrentUser } from './store/session';
import Home from './components/Home';
import NavBar from './components/Navbar';

function App() {

  const user = useSelector(getCurrentUser);
  return (

    user !== null ? (
      <>
      <NavBar/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path=''>
          <Redirect to='/' />
        </Route>
      </Switch>
      </>
      ) 
      : 
      (
      <Switch>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/signup">
          <Signup/>
        </Route>
        <Route path=''>
          <Redirect to='/signup' />
        </Route>
      </Switch>
      )
      

  );
}

export default App;
