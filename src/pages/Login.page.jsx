import { useDispatch } from 'react-redux';
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthAction } from '../redux/auth/authAction';
import logo from '../assets/images/logo.png'
import bgGif from "../assets/images/Revenue.gif"

const schema =z.object({
    email: z.string().email(),
    password: z.string().min(6,"Password has to be more than 5 characters")
})

function Login() {
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

    const onSubmit = async (data) => {
        try {    
          console.log(data);
          await dispatch(AuthAction.loginAsyncThunk(data))

        } catch (err) {
            toast.error("invalid email or password")
        }
    }

return(
    <div className='container-fluid overflow-hidden'>
        <div className="row vh-100">
            <div className="col-5 d-flex flex-column justify-content-center h-100">
                <div className='p-4 d-flex flex-column align-items-center justify-content-center'>
                    <img src={logo} alt="Logo proply" className='mb-4' style={{width: "5rem"}}/>
                    <div className='text-center'>
                        <h2 className='fs-4'>Welcome Back!</h2>
                        <span className='text-black-50' style={{fontSize: ".825rem"}}>Please Sign In to continue</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='p-5'>
                    <div className="mb-3">
                        <label htmlFor="email" className='fw-bold text-black-50 mb-2' style={{fontSize: ".825rem"}}>Email</label>
                        <input {...register("email")}
                        type="text" name="email" id="email" 
                        className={`form-control rounded-3 border border-2 bg-body-tertiary ${errors.email && "is-invalid"}`}/>
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>
                    <div className="mb-1">
                        <label htmlFor="password" className='fw-bold text-black-50 mb-2' style={{fontSize: ".825rem"}}>Password</label>
                        <input {...register("password")}
                        type="password" name="password" id="password" 
                        className={`form-control rounded-3 border border-2 bg-body-tertiary ${errors.password && "is-invalid"}`}/>
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>
                    <div className="mb-2 text-end">
                        <a href="#" className='text-decoration-none text-primary' style={{fontSize: ".825rem"}}>Forgot Password</a>
                    </div>
                    <button disabled={!isValid} type="submit" className="btn btn-primary mt-3 w-100 fw-semibold text-white">Login</button>
                </form>
            </div>
            <div className="col-7 d-flex justify-content-center align-items-center" style={{backgroundColor: "#F5F4F7"}}>
                <img src={bgGif} alt="Gif Login" className='w-75'/>
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
    </div>
)
}

export default Login;
