import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/authSlice';
// import {useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useEffect } from 'react';
import { useState } from 'react';
import logo from '../assets/react.svg'
import { useNavigate } from 'react-router-dom';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../services/authService';

const schema =z.object({
    email: z.string().email(),
    password: z.string().min(6,"Password has to be more than 5 characters")
})

function Login() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    }=useForm({
        mode: "onChange",
        resolver:zodResolver(schema),
    });

    const service = AuthService();

    const onSubmit = async (data) => {
        try {    
          const res = await service.login(data.email, data.password);
          console.log(res);
    
          const token = res.data.token;
          await AsyncStorage.setItem('token', token);
    
          const decodedToken = jwtDecode(token);
          const role = decodedToken.role;
          console.log("Role", role)
        } catch (err) {
            toast.error("invalid email or password")
        }
      }
    


return(
    <>
    <div className="container d-flex justify-content-center align-items-center" style={{minHeight: "80vh", marginTop:50}}>
        <div className="shadow-lg rounded-4" style={{width: 500}}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 text-left">
                <div className="mt-4 mb-3 ">
                    <div className="row text-center ">
                        <img src={logo} alt="login" className="img-fluid " style={{height:150, marginBottom:20}}/>
                    </div>
                    <h2 className="text-center">Log In</h2>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input {...register("email")}
                         type="text" name="email" id="email" className={`form-control rounded-3 border-0 border-bottom ${errors.email && "is-invalid"}`}/>
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>
                    <div className="mb-3">
                    <label htmlFor="password">Password</label>
                        <input {...register("password")}
                            type="password"
                            name="password"
                            id="password"
                            className={`form-control rounded-3 border-0 border-bottom ${errors.password && "is-invalid"}`}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>
                    <div className="mb-3 text-end">
                        <a href="#">Lupa Password</a>
                    </div>
                    <button disabled={!isValid} type="submit" className="btn btn-primary mt-4 w-100">Login</button>
                </div>
            </form>
        </div>
    </div>
    <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Flip}
        />

    </>
)
}

export default Login;
