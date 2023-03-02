import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../store/session';
import { useHistory } from 'react-router-dom';

const Signup = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const redirectLogin = (e) => {
    e.preventDefault();
    history.push('/login');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signup({username, password}))
    .catch(async (res) => {
      let data;
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        data = await res.text(); // Will hit this case if the server is down
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  }


  return (

    <div className="signup">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        {errors && errors.map(error => <div>{error}</div>)}
        <label htmlFor="username">Username</label>
        <input onChange={e => setUsername(e.target.value)} value={username} type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input onChange={e => setPassword(e.target.value)} value={password} type="password" name="password" id="password" />
        <button type="submit">Signup</button>
        <p>Have an account?
          <button onClick={redirectLogin}>Log In</button>
        </p>
      </form>
    </div>

  )


}

export default Signup;