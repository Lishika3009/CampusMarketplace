import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import "./Reg.css";
// import "./signup.css";\
import "./login.css";
function Signup(){
    const navigate = useNavigate()

    const[username,setUserName] = useState('')
    const[password,setPassword] = useState('')
    const[mobile,setMobile] = useState('')
    const[email,setEmail] = useState('')
    const[userlocation,setLocation] = useState('')

    const handleApi = () => {
        console.log(username,password,mobile,email,userlocation)
        const url = "http://127.0.0.1:3001/signup"
        const data = {username,password,mobile,email,userlocation};
        axios.post(url,data)
        .then((res)=>{
            alert(res.data.message);
            if (res.data.success) { // Assuming your API sends a success flag
              navigate("/login"); // Redirect to the login page
          }
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div className="content">
          <div className="flex-div">
            <div className="left-div">
              <div className="text-form">
                <h1 className="form-text1">Get Started Now</h1>
                <form>
                
                <label>Username</label>
                <input className='form-control account-form' placeholder="Username" type = "text" value={username} onChange={(e) => {setUserName(e.target.value);}} />

                <label>Mobile Number</label>
                <input className='form-control account-form' placeholder="Mobile number" type="text" value={mobile} onChange={(e) =>{setMobile(e.target.value);}}/>

                <label>Email Address</label>
                <input className='form-control account-form' placeholder="Email address" type="text" value={email} onChange={(e) =>{setEmail(e.target.value);}}/> 

                <label>Password</label>
                <input className='form-control account-form' placeholder="Password" type="text" value={password} onChange={(e) =>{setPassword(e.target.value);}}/> 
        
                <button className="login" type="button" onClick={handleApi}>Create New Account</button>
                <div class="centered-hr">
              
                  <hr/>
                </div>
                <button className="create-account" type="button" onClick={() => navigate('/login')}>Login</button>
              </form>
              </div>
              
            </div>
        

        <div className="right-div">
          
        </div>
      </div>
    </div>
    )
}

export default Signup;