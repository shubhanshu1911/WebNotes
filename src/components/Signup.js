import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "",  email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success) {
            // save the auth token and redirect
            localStorage.setItem("token", json.authToken);
            navigate("/");
            props.showAlert("Account Created successfully", "success");
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container" style={{ fontFamily: 'McLaren' }}>
            <div className="row">
                <div className="col-md-6 mx-auto" style={{ maxWidth: '500px' }}>
                    <h2 style={{ paddingBottom: "15px" }}>Signup to Webnotes</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fs-5">Name</label>
                            <input type="text" className="form-control border border-dark"  id="name" onChange={onChange} name="name" aria-describedby="emailHelp" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fs-5">Email</label>
                            <input type="email" className="form-control border border-dark"  id="email" onChange={onChange} name="email" aria-describedby="emailHelp" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fs-5">Password</label>
                            <input type="password"  onChange={onChange} name='password' className="form-control border border-dark" id="password" required minLength={5}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label fs-5">Confirm Password</label>
                            <input type="cpassword" onChange={onChange} name='cpassword' className="form-control border border-dark" id="cpassword" required minLength={5} />
                        </div>

                        <button type="submit" className="btn btn-warning text-light">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;