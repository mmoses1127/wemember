import useState from 'react';

const Signup = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSignup = (e) => {
    e.preventDefault();
    
  }


  return (

    <div className="signup">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Signup</button>
      </form>
    </div>

  )


}

export default Signup;