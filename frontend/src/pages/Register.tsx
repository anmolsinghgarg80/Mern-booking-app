import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import {useMutation, useQueryClient } from 'react-query';

import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  confimPassword: string
}

const Register = () => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { showToast } = useAppContext();

  const {register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken")
        showToast({message:"Registration Successfull !", type: "SUCCESS"});
        navigate("/");
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: "ERROR"});
    },

  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data); 
  });

  return (
    <>
        <div className='container mx-auto md:w-3/4 border rounded bg-white'>

          <form onSubmit={onSubmit} >
            <h4 className='text-2xl font-bold my-4'>Sign  Up</h4>
            <div className="flex md:flex-row flex-col gap-5">
              <label className="text-gray-700 text-sm font-bold flex-1">
                First Name
                <input 
                    type="text"
                    className='input-box'
                    {...register("firstName",{required:"This field is required"})}
                  />
                {errors.firstName && (<p className='text-red-600 text-xs pb-1'>{errors.firstName?.message}</p>) }
              </label>
              <label className="text-gray-700 text-sm font-bold flex-1">
                Last Name
                <input 
                    type="text"
                    className='input-box'
                    {...register("lastName",{required:"This field is required"})}
                  />
                {errors.lastName && (<p className='text-red-600 text-xs pb-1'>{errors.lastName?.message}</p>) }
              </label>
            </div>

            <label className="text-gray-700 text-sm font-bold flex-1">
              Email
              <input 
                  type="email"
                  className='input-box'
                  {...register("email",{required:"This field is required"})}
                />
                {errors.email && (<p className='text-red-600 text-xs pb-1'>{errors.email?.message}</p>) }
                </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input 
                    type="password"
                    className='input-box'
                    {...register("password",{required:"This field is required"})}
                  />
                {errors.password && (<p className='text-red-600 text-xs pb-1'>{errors.password?.message}</p>) }
                </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input 
                    type="password"
                    className='input-box'
                    {...register("confimPassword",{
                      validate:(val) => {
                        if(!val){
                          return "This field is required";
                        }
                        else if(watch("password") !== val){
                          return "Your passwords do not match";
                        }
                      },
                    })}
                  />
                {errors.confimPassword && (<p className='text-red-600 text-xs pb-1'>{errors.confimPassword?.message}</p>) }
                </label>

            <button type='submit' className='btn-primary'>
              Create Account
            </button>

            <p className='text-sm text-center my-5'>
              Already have an account?{" "}
              <Link to = "/signin" className='font-medium text-primary underline'>
                Login
              </Link>
            </p>
          </form>

        </div>
    </>

  );
};

export default Register;