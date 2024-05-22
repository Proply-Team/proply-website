import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";


const schema =z.object({
  id: z.string().min(1,"ID is required"),
  name: z.string().min(1,"Name is required"),
  division: z.string().min(8,"Division is required"),
  email: z.string().min(1,"Email is required").email(),
  password: z.string().min(8,"Password has to be more than 8 characters"),
})


const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues:{
          id:'',
          name:'',
          email:'',
          password:'',
          division:'',
        },
        resolver:zodResolver(schema),
      });

      const onSubmit = (data) => {
        console.log(data);
        reset
      };
    
  return (
    <>
    <h2>Register New Admin</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="shadow-sm p-4 rounded-2 bg-white w-75">
        <div className="mb-2">
          <label className="form-label">Name</label>
          <input {...register("name")} className={`form-control rounded-3 border-0 border-bottom ${errors.name && "is-invalid"}`} type="text" name="name" />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">ID</label>
          <input {...register("id")} className={`form-control rounded-3 border-0 border-bottom ${errors.id && "is-invalid"}`} type="text" name="id" />
          {errors.id && <div className="invalid-feedback">{errors.id.message}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input {...register("email")} className={`form-control rounded-3 border-0 border-bottom ${errors.email && "is-invalid"}`} type="email" name="email" />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">Division</label>
          <input {...register("division")} className={`form-control rounded-3 border-0 border-bottom ${errors.division && "is-invalid"}`} type="text" name="division" />
          {errors.division && <div className="invalid-feedback">{errors.division.message}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label">Password</label>
          <input {...register("password")} className={`form-control rounded-3 border-0 border-bottom ${errors.password && "is-invalid"}`} type="password" name="password" />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
        <div className="d-flex gap-2 mt-4">
          <button className="btn btn-success me-2 d-flex align-items-center gap-2" type="submit">Register</button>
        </div>
      </form>

    </>
  )
}

export default RegisterForm