import React from 'react'
import { useRef,useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../redux/authApiSlice'
import logo from '../assets/react.svg'

const Login = () => {
  const userRef = useRef()
  const errorRef = useRef()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [errorMessage,setErrorMessage] = useState('')
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()


  useEffect(()=>{
    userRef.current.focus()
  },[])

  useEffect(()=>{
    setErrorMessage('')
  },[email,password])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const userData = await login ({email,password}).unwrap()
      dispatch(setCredentials({...userData,email}))
      setEmail('')
      setPassword('')
      navigate('/app')
    } catch (error) {
      if(!error?.response) {
        setErrorMessage('No Server Response')
      } else if (error.response?.status === 400) {
        setErrorMessage('Missing Email or Password')
      } else if (error.response?.status === 401) {
        setErrorMessage('Unauthorized')
      } else {
        setErrorMessage('Login Failed')
      }
      errorRef.current.focus();
    }
  }

  const handleEmailInput = e => setEmail(e.target.value)
  const handlePassInput = e => setPassword(e.target.value)

  return (
    
    isLoading? <p>...</p> :
    <>
          <div
        className="container d-flex mx-auto justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="shadow-lg rounded-4" style={{ width: 500 }}>

    <section className='login'>
            <p ref={errorRef} >{errorMessage}</p>

    <form onSubmit={handleSubmit}className="p-4">
            <div className="row mt-4 mb-3">
              <div className="col text-center">
                <img
                  src={logo}
                  alt="login"
                  className="img-fluid"
                  style={{ height: 200 }}
                />
              </div>
            </div>
            <h2 className="text-center">Log In</h2>
            <div className="mb-3">
    <label htmlFor="email">Email:</label>
    <input className="form-control rounded-3 border-0 border-bottom"
        type="text"
        id="email"
        ref={userRef}
        value={email}
        onChange={handleEmailInput}
        autoComplete="off"
        required
    />
            </div>
            <div className="mb-3">

    <label htmlFor="password">Password:</label>
    <input className="form-control rounded-3 border-0 border-bottom"
        type="password"
        id="password"
        onChange={handlePassInput}
        value={password}
        required
    />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-4 w-100"
            >
              Login
            </button>
</form>
</section>
</div>
</div>
</>
)

return content

}

export default Login