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

const schema =z.object({
    email: z.string().email(),
    password: z.string().min(8,"Password has to be more than 8 characters")
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


    console.log(errors);
    const onSubmit = (data) => {
        const userData = { email: data.email, password:data.password };
    
    // const response = await axios.post('/api/auth/login',data);
    // try {
    //     const response = await authService.login (data);
    //     console.log(response);
    //     if (response && response.statusCode === 200) {
    //         const {token,userId, roles} = response.data;
    //         sessionStorage.setItem('token', token);
    //         sessionStorage.setItem('userId', userId);
    //         sessionStorage.setItem('roles', JSON.stringify(roles));
    //         navigate("/")
    //     }
        if (data.email==="admin@gmail.com" && data.password==="12121212") {
            toast.success("login success");
            console.log("toast login");
            dispatch(login(userData));
            navigate("/")
        }else {
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
