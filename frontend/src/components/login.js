import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleApi = () => {
    console.log({ username, password });

    const url = "http://127.0.0.1:3001/login";
    const data = { username, password };
    axios.post(url, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.message) {
          if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            navigate('/home');  // Navigate after setting the localStorage
          }
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err, 20);
        alert("Server Error");
      });
  }

  return (
    <div className="content">
      <div className="flex-div">
        <div className="left-div">
          <div className="text-form">
          <h1 className="form-text1">Welcome Back!</h1>
          <p className="form-text2">Enter your credentials to access your account</p>
          <form>
            <label>Username</label>
            <input type="text" placeholder="Email" required value={username} onChange={(e) => setUserName(e.target.value)} />

            <label>Password</label>
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="login" type="button" onClick={handleApi}>Log In</button>
            <div class="centered-hr">
              
              <hr/>
            </div>

            <button className="create-account" type="button" onClick={() => navigate('/signup')}>Create New Account</button>
          </form>
          </div>
          
        </div>
        
        <div className="right-div">
          
          
        </div>
      </div>
    </div>
  );
}

export default Login;
