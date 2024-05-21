import React from 'react'
import { useForm } from 'react-hook-form';




const RegisterComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      
      const onSubmit = (data) => {
        console.log(data);
      };
    
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="shadow-sm p-4 rounded-2 bg-white w-100">
        <div className="mb-2">
          <label className="form-label">Name</label>
          <input {...register("name")} className="form-control" type="text" name="name" />
        </div>
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input {...register("email")} className="form-control" type="email" name="email" />
        </div>
        <div className="mb-2">
          <label className="form-label">Division</label>
          <input {...register("division")} className="form-control" type="text" name="division" />
        </div>
        <div className="mb-2">
          <label className="form-label">Password</label>
          <input {...register("password")} className="form-control" type="password" name="password" />
        </div>
        <div className="d-flex gap-2 mt-4">
          <button className="btn btn-success me-2 d-flex align-items-center gap-2" type="submit">Register</button>
        </div>
      </form>

    </>
  )
}

export default RegisterComponent