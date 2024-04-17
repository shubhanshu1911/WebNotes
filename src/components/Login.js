import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'  // Import useNavigate instead of useHistory

const Login = (props) => {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate();  // Use useNavigate hook here
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      // save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Login successfully", "success");
    }else{
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <div className="container" style={{ fontFamily: 'McLaren' }}>
      <div className="row">
        <div className="col-md-6 mx-auto" style={{ maxWidth: '500px' }}>
          <h2 style={{ paddingBottom: "15px" }}>Login to Webnotes</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fs-5">Email</label>
              <input type="email" className="form-control border border-dark" value={credentials.email} id="email" onChange={onChange} name="email" aria-describedby="emailHelp" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fs-5">Password</label>
              <input type="password" value={credentials.password} onChange={onChange} name='password' className="form-control border border-dark" id="password" />
            </div>

            <button type="submit" className="btn btn-warning text-light">Login</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login;