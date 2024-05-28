import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import moment from 'moment';
import {getDivisionAction} from "../../redux/divisionSlice"
import { postRegisterAdminAction,getUserAction,postRegisterManagerAction,postRegisterEmployeeAction } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { selectAuth } from '../../redux/auth/authSlice';
const schema =z.object({
  fullName: z.string().min(1,"Name is required"),
  email: z.string().min(1,"Email is required").email(),
  password: z.string().min(6,"Password has to be more than 5 characters"),
  mobilePhone: z.string().min(8).regex(/^\d+$/)
})


const RegisterForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector(selectAuth)
  const{divs}= useSelector((state)=>state.division)
  const [selectedDate, setSelectedDate] = useState('');
  const [maritalStatus, setMaritalStatus] = useState([null,'Options']);
  const [gender, setGender] = useState([null,'Options']);
  const [division, setDivision] = useState([null,'Options']);
  const [role,setRole] = useState("Choose Role to be Registered");


  const handleDateChange = (event) => {
    setSelectedDate(event.target.value)
  };

  useEffect(()=>{
    dispatch(getDivisionAction());
},[dispatch]);


  const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues:{
          fullName:'',
          email:'',
          password:'',
          birthDate:'',
          mobilePhone:'',
          gender:'',
          maritalStatus:'',
          divisionId:'',
        },
        resolver:zodResolver(schema),
      });

    
      const onSubmit = async (data) => {
        try {
          const registerInputs = {
            ...data,
            birthDate: moment(selectedDate, "YYYY-MM-DD").valueOf(),
            gender: gender[0],
            maritalStatus: maritalStatus[0],
            divisionId: division[0],
          }
          console.log(registerInputs);
          if (gender[0]!=null&&maritalStatus[0]!=null&&division[0]!=null) {            
            if (role=="Admin") {
              await dispatch(postRegisterAdminAction(registerInputs));
              reset()
              navigate('/user')
            } else if (role=="Manager") {
              await dispatch(postRegisterManagerAction(registerInputs));
              reset()
              navigate('/user')
            } else if (role=="Employee") {
              await dispatch(postRegisterEmployeeAction(registerInputs));
              reset()
              navigate('/user')
            } else {
              toast.error("Choose role to be registered")
            }  
          } else {
            toast.error("All fields are required")
          }
        } catch (error) {
          console.log(error);
        }
      };
    
  return (
    <div className='d-flex flex-column w-100'>
      <div className="dropdown">
        <button className="btn btn-info dropdown-toggle px-4 fw-semibold" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {role}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
          {user.role=='ROLE_ADMIN' && (<a className="dropdown-item" onClick={()=>setRole("Admin")}>Admin</a>)}
          <a className="dropdown-item" onClick={()=>setRole("Manager")}>Manager</a>
          <a className="dropdown-item" onClick={()=>setRole("Employee")}>Employee</a>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="shadow-sm p-4 rounded-2 bg-white">
        <div className="mb-2">
          <label className="form-label">Name</label>
          <input {...register("fullName")} className={`bg-light form-control rounded-3 border-0 border-bottom ${errors.fullName && "is-invalid"}`} type="text" name="fullName" />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">Birth Date</label>
          <input className='bg-light form-control rounded-3 border-0 border-bottom' type="date" id="date" value={selectedDate} onChange={handleDateChange} style={{width:200}}/>
          {/* {selectedDate && <p>{formatDate(selectedDate)}</p>} */}
        </div>
        <div className="mb-2">
          <label className="form-label">Phone Number</label>
          <input {...register("mobilePhone")} className={`bg-light form-control rounded-3 border-0 border-bottom ${errors.mobilePhone && "is-invalid"}`} type="text" name="mobilePhone" />
          {errors.mobilePhone && <div className="invalid-feedback">{errors.mobilePhone.message}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">Gender</label>
          <div className="dropdown">
            <button className="btn btn-info dropdown-toggle px-4 fw-semibold " type="button" id="gender" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {gender[1]}
            </button>
            <div className="dropdown-menu" aria-labelledby="gender" >
              <a className="dropdown-item" onClick={()=>setGender(["FEMALE","Female"])}>Female</a>
              <a className="dropdown-item" onClick={()=>setGender(["MALE","Male"])}>Male</a>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label className="form-label">Status</label>
          <div className="dropdown">
            <button className="btn btn-info dropdown-toggle px-4 fw-semibold" type="button" id="maritalStatus" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {maritalStatus[1]}
            </button>
            <div className="dropdown-menu" aria-labelledby="maritalStatus" >
              <a className="dropdown-item" onClick={()=>setMaritalStatus(["MARRIED","Married"])}>Married</a>
              <a className="dropdown-item" onClick={()=>setMaritalStatus(["SINGLE","Single"])}>Single</a>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label className="form-label">Division</label>
          <div className="dropdown">
            <button className="btn btn-info dropdown-toggle px-4 fw-semibold" type="button" id="division" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {division[1]}
            </button>
            <div className="dropdown-menu" aria-labelledby="division" >
              {divs.map((div)=>{
                return(
              <a key={div.divisionId} className="dropdown-item" onClick={()=>setDivision([div.divisionId,div.name])}>{div.name}</a>
                )})}
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input {...register("email")} className={`bg-light form-control rounded-3 border-0 border-bottom ${errors.email && "is-invalid"}`} type="email" name="email" />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">Password</label>
          <input {...register("password")} className={`bg-light form-control rounded-3 border-0 border-bottom ${errors.password && "is-invalid"}`} type="password" name="password" />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
        <div className="d-flex gap-2 mt-4">
          <button className="btn btn-secondary px-5 d-flex align-items-center gap-2 fw-semibold " type="submit">Register</button>
        </div>
      </form>

    </div>
  )
}

export default RegisterForm