import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import './login.css';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/appConetxt";
import { toast } from "react-toastify";
import axios from 'axios'

export default function Login() {
  const navigate = useNavigate();
  const { backendUrl, setisLoggedIn, getUserData } = useContext(AppContext);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
  const [state, setstate] = useState('sign up');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  axios.defaults.withCredentials = true;

  const onSubmit = async (formData) => {
    try {
      if (state === 'sign up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', formData);
        if (data.success) {
          setisLoggedIn(true);
          toast.success("register success");
          getUserData();
          navigate('/');
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', formData);
        if (data.success) {
          setisLoggedIn(true);
          getUserData();
          navigate('/');
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 body">
      <div className="form-body p-5">
        <h3>{state === 'login' ? 'Login' : 'Sign Up'}</h3>
        <p>{state === 'login' ? 'Login to your account' : 'Register yourself here'}</p>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="d-flex flex-column">
            {state === 'sign up' && (
              <>
                <input className="mb-2" {...register("uname", { pattern: { value: /^[a-zA-Z\s]+$/, message: "Should contain only letters" }, required: { value: true, message: "Must not be empty" } })} placeholder="Enter Your Name" type="text" />
                {errors.uname && <p className="text-danger error-message">{errors.uname.message}</p>}
              </>
            )}
            <input className="mb-2" {...register("email", { pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Please enter a valid email address" }, required: { value: true, message: "Must not be empty" } })} placeholder="Enter Your Email" type="email" />
            {errors.email && <p className="text-danger error-message">{errors.email.message}</p>}
            <input className="mb-2" {...register("password", { minLength: { value: 8, message: "Must contain atleast 8 characters" }, maxLength: { value: 12, message: "Must not contain more than 12 characters" }, required: { value: true, message: "Must not be empty" } })} placeholder="Enter Your Password" type="password" />
            {errors.password && <p className="text-danger error-message">{errors.password.message}</p>}
            {state === 'login' && <span onClick={() => navigate('/reset-password')}>Forgot Password?</span>}
            <input type="submit" className="w-50 mx-auto my-3 btn btn-primary" disabled={isSubmitting} />

            {state === 'sign up' ? (
              <p>Already have an account? &nbsp; <span onClick={() => setstate('login')}>Login here</span></p>
            ) : <p>Don't have an account? &nbsp; <span onClick={() => setstate('sign up')}>Sign Up here</span></p>}

          </div>
        </form>
      </div>
    </div>
  )
} 