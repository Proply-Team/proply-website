import login from '../assets/react.svg'

const Login = () => {
  return (
    <>
    <div style={{height:550, backgroundColor:'white', width: 450, borderRadius:30, padding:20}}>
      <h1 style={{color:'black'}}>Login</h1>
      <div style={{margin:10}}>
        <div style={{marginLeft:20, marginBottom:5, textAlign:'left'}}>
        <label htmlFor="email" style={{color:'black'}}>Email</label>
        </div>
        <input type="email" name="email" style={{width:400, height:30, borderRadius:30, backgroundColor:'lightgray'}}/>
      </div>
      <div style={{margin:10}}>
        <div style={{marginLeft:20, marginBottom:5, textAlign:'left'}}>
        <label htmlFor="password" style={{color:'black'}}>Password</label>
        </div>
        <input type="text" name="password" style={{width:400, height:30, borderRadius:30, backgroundColor:'lightgray'}}/>
      </div>
      <div style={{margin:10}}>
      <button type="submit" style={{width:400, height:40, marginTop:50, borderRadius:30, paddingTop:7}}>Login</button>
      <button type="submit" style={{width:400, height:40, marginTop:20, borderRadius:30, paddingTop:7, backgroundColor:'white', borderColor:'black', color:'black'}}>Register</button>
      </div>
    </div>
  </>
  )
}

export default Login