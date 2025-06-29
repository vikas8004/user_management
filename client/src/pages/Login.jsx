import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useUser } from '../context/UserContextApi';
import { axiosInstance } from '../api/axiosInstance.js';
import toast from 'react-hot-toast';

const Login = () => {
  const { setLoggedInUser } = useUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // console.log("values", values)
      const res = await axiosInstance.post('/login', values);
      if (res.status === 200) {
        // console.log(res.data.data);
        setLoggedInUser(res.data.data);
        toast.success(res.data.message);
        resetForm();
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold mb-2">Login</h2>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  {/* Email Field */}
                  <div className="form-control">
                    <label htmlFor="email" className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="input input-bordered w-full pr-10"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Password Field with Toggle */}
                  <div className="form-control">
                    <label htmlFor="password" className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <div className="relative">
                      <Field
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="input input-bordered w-full pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2/4 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(prev => !prev)}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Submit Button (Full Width) */}
                  <div className="form-control mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full"
                    >
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Register CTA */}
            <div className="text-center text-sm mt-4">
              Don’t have an account?{' '}
              <Link to="/register" className="link link-primary font-medium">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
