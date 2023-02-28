import {Switch, Route, Redirect} from 'react-router-dom';
import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (

    <Switch>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/signup">
        <Signup/>
      </Route>
      
    </Switch>

  );
}

export default App;
