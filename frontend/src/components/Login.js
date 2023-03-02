import { useDispatch } from "react-redux";
import { login } from "../store/session";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const redirectSignup = (e) => {
  e.preventDefault();
    history.push('/signup');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({username, password}))
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
  };


  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        {errors && errors.map(error => <div>{error}</div>)}
        <input onChange={e => setUsername(e.target.value)} value={username} type='text' placeholder='Username' />
        <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' />
        <button type='submit'>Login</button>
        <p>No account? <button onClick={redirectSignup}>Sign Up</button></p>
      </form>
    </div>
  )

}

export default Login;