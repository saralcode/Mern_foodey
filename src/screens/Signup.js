import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {

    const [credentials, setcredentials] = useState({name:"",email:"",password:"",geolocation:""})

    const handlesubmit=async(e)=>{
        e.preventDefault();
        const response= await fetch("http://localhost:5000/api/createuser",{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                name:credentials.name,
                email:credentials.email,
                password:credentials.password,
                location:credentials.geolocation
            })

        })
        const json=await response.json()
        console.log(json)

        if(!json.success){
            alert("Enter valid credentials")
        }
    }

    const onchange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }



  return (
    <>
    <div className='container'>

    <form  onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email}  id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password}  id="exampleInputPassword1" onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="address" className="form-label">Address</label>
    <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onchange}/>
  </div>
  <button type="submit" className="m-3 btn btn-danger">Submit</button>
  <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
</form>
    </div>
    
    </>
  )
}
