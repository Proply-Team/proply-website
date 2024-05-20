import login from '../assets/react.svg'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AuthService from "../services/Auth.service";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useEffect } from "react";



const schema = z.object({
  username: z.string().min(1, "Username can not be blank"),
  password: z
    .string()
    .min(8, "Password must be more than 8 characters"),
});

function Login() {
  const authService = useMemo(() => AuthService(), []);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      if (response && response.statusCode === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/app");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const checkToken = async () => {
        const isValidToken = await authService.validateToken();
        if (isValidToken) {
          navigate("/dashboard");
        }
      };
      checkToken();
    }
  }, [authService, navigate]);

  return (
    <>
      <div
        className="container d-flex align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="shadow-lg rounded-4" style={{ width: 500 }}>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <div className="row mt-4 mb-3">
              <div className="col text-center">
                <img
                  src={login}
                  alt="login"
                  className="img-fluid"
                  style={{ height: 200 }}
                />
              </div>
            </div>
            <h2 className="text-center">Log In</h2>
            <div className="mb-3">
              <label htmlFor="username">Username</label>
              <input
                {...register("username")}
                type="text"
                name="username"
                id="username"
                className={`form-control rounded-3 border-0 border-bottom ${
                  errors.username && "is-invalid"
                }`}
              />
              {errors.username && (
                <div className="invalid-feedback">
                  {errors.username.message}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                type="password"
                name="password"
                id="password"
                className={`form-control rounded-3 border-0 border-bottom ${
                  errors.password && "is-invalid"
                }`}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>
            <button
              disabled={!isValid}
              type="submit"
              className="btn btn-primary mt-4 w-100"
            >
              Login
            </button>
            <button onClick={()=>navigate("/register")} className="btn btn-light mt-4 w-100">Register</button>

          </form>
        </div>
      </div>
    </>
  );
}

export default Login;



// const Login = () => {
//   return (
//     <>
//     <div style={{height:550, backgroundColor:'white', width: 450, borderRadius:30, padding:20}}>
//       <h1 style={{color:'black'}}>Login</h1>
//       <div style={{margin:10}}>
//         <div style={{marginLeft:20, marginBottom:5, textAlign:'left'}}>
//         <label htmlFor="email" style={{color:'black'}}>Email</label>
//         </div>
//         <input type="email" name="email" style={{width:400, height:30, borderRadius:30, backgroundColor:'lightgray'}}/>
//       </div>
//       <div style={{margin:10}}>
//         <div style={{marginLeft:20, marginBottom:5, textAlign:'left'}}>
//         <label htmlFor="password" style={{color:'black'}}>Password</label>
//         </div>
//         <input type="text" name="password" style={{width:400, height:30, borderRadius:30, backgroundColor:'lightgray'}}/>
//       </div>
//       <div style={{margin:10}}>
//       <button type="submit" style={{width:400, height:40, marginTop:50, borderRadius:30, paddingTop:7}}>Login</button>
//       <button type="submit" style={{width:400, height:40, marginTop:20, borderRadius:30, paddingTop:7, backgroundColor:'white', borderColor:'black', color:'black'}}>Register</button>
//       </div>
//     </div>
//   </>
//   )
// }

// export default Login