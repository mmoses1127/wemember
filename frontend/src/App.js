import {Switch, Route, Redirect} from 'react-router-dom';
import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import { useSelector } from 'react-redux';
import { getCurrentUser } from './store/session';
import Home from './components/Home';
import NavBar from './components/Navbar';
import NewMemory from './components/NewMemory';
import UpdateMemory from './components/UpdateMemory';
import Memory from './components/Memory';

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
        <Route exact path="/new">
          <NewMemory />
        </Route>
        <Route exact path="/memories/:memoryId">
          <Memory />
        </Route>
        <Route exact path="/memories/:memoryId/edit">
          <UpdateMemory />
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
