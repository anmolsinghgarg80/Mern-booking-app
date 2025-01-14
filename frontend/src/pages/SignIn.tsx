import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";


export type SignInFormData = {
  email: string,
  password: string,
}

const SignIn = () => {
  const { register, handleSubmit, formState:{errors} } = useForm<SignInFormData>();

  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation(apiClient.signin ,{
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({message:"SignIn successfull !", type: "SUCCESS"});
      navigate("/");
    },

    onError: async (error: Error) =>{
      showToast({message: error.message, type: "ERROR"});
    },
   })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <>
        <div className='container mx-auto md:w-4/6 border rounded bg-white'>

          <form onSubmit={onSubmit}  >
            <h4 className='text-2xl font-bold my-4'>Sign In</h4>

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

            <button type='submit' className='btn-primary'>
              SignIn
            </button>

            <p className='text-sm text-center my-5'>
              Do not have an account?{" "}
              <Link to = "/register" className='font-medium text-primary underline'>
                Create Account
              </Link>
            </p>
          </form>

        </div>
    </>

  );
};

export default SignIn;