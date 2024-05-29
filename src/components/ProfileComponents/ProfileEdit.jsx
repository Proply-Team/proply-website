import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { selectUser } from '../../redux/userSlice';

const schema =z.object({
  id: z.string().nullable(),
  fullName: z.string().min(1,"Name is required"),
  division: z.string().min(8,"Division is required"),
  email: z.string().min(1,"Email is required").email(),
  password: z.string().min(8,"Password has to be more than 8 characters"),
})


const ProfileEdit = () => {
  const {usr} = useSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const{divs}= useSelector((state)=>state.division)
  const [selectedDate, setSelectedDate] = useState('');
  const [maritalStatus, setMaritalStatus] = useState([null,'Options']);
  const [gender, setGender] = useState([null,'Options']);
  const [division, setDivision] = useState([null,'Options']);
  const [role,setRole] = useState("Choose Role to be Registered");


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues:{
      fullName:usr.fullName,
      email:usr.email,
      password:usr.password,
      birthDate:usr.birthDate,
      mobilePhone:usr.mobilePhone,
      gender:usr.gender,
      maritalStatus:usr.maritalStatus,
      divisionId:usr.divisionId,
    },
    resolver:zodResolver(schema),
  });

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value)
  };


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

    } catch (error) {
      console.log(error);
    }
  };

return (
<div className='d-flex flex-column w-100'>
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


export default ProfileEdit