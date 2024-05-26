import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';


const schema =z.object({
  id: z.string().nullable(),
  fullName: z.string().min(1,"Name is required"),
  email: z.string().min(1,"Email is required").email(),
  password: z.string().min(6,"Password has to be more than 5 characters"),
  mobilePhone: z.string().min(8).regex(/^\d+$/)
})


const RegisterForm = () => {
  const navigate = useNavigate()
  const{divs}= useSelector((state)=>state.division)
  const [selectedDate, setSelectedDate] = useState('');
  const [maritalStatus, setMaritalStatus] = useState(['Options','']);
  const [gender, setGender] = useState(['Options','']);
  const [division, setDivision] = useState(['Options','']);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const formatDate = (date) => {
    return moment(date).format('LL');
  };

  const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues:{
          id:'',
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

    
      const onSubmit = (data) => {
        const registerInputs = {
          ...data,
          id: new Date().getMilliseconds().toString(),
          birthDate: selectedDate,
          gender: gender[0],
          maritalStatus: maritalStatus[0],
          divisionId: division[0],
        }
        console.log(registerInputs);
        toast.success("registration success");
        reset()
        navigate('/register')
      };
    
  return (
    <div className='d-flex flex-column w-100'>
      <form onSubmit={handleSubmit(onSubmit)} className="shadow-sm p-4 rounded-2 bg-white">
        <div className="mb-2">
          <label className="form-label">Name</label>
          <input {...register("fullName")} className={`form-control rounded-3 border-0 border-bottom ${errors.fullName && "is-invalid"}`} type="text" name="fullName" />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">Birth Date</label>
          <input type="date" id="date" value={selectedDate} onChange={handleDateChange}/>
          {selectedDate && <p>Selected date (formatted): {formatDate(selectedDate)}</p>}
        </div>
        <div className="mb-2">
          <label className="form-label">Phone Number</label>
          <input {...register("mobilePhone")} className={`form-control rounded-3 border-0 border-bottom ${errors.mobilePhone && "is-invalid"}`} type="text" name="mobilePhone" />
          {errors.mobilePhone && <div className="invalid-feedback">{errors.mobilePhone.message}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">Gender</label>
          <div className="dropdown">
            <button className="btn btn-info dropdown-toggle px-4 fw-semibold " type="button" id="gender" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {gender[1]}
            </button>
            <div className="dropdown-menu" aria-labelledby="gender" >
              <a className="dropdown-item" onClick={()=>setGender(["female","Female"])}>Female</a>
              <a className="dropdown-item" onClick={()=>setGender(["male","Male"])}>Male</a>
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
              <a className="dropdown-item" onClick={()=>setMaritalStatus(["married","Married"])}>Married</a>
              <a className="dropdown-item" onClick={()=>setMaritalStatus(["single","Single"])}>Single</a>
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
              <a className="dropdown-item" onClick={()=>setDivision([div.id,div.name])}>{div.name}</a>
                )})}
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input {...register("email")} className={`form-control rounded-3 border-0 border-bottom ${errors.email && "is-invalid"}`} type="email" name="email" />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">Password</label>
          <input {...register("password")} className={`form-control rounded-3 border-0 border-bottom ${errors.password && "is-invalid"}`} type="password" name="password" />
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