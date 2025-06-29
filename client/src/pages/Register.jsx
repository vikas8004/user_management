import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { axiosInstance } from '../api/axiosInstance';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axiosInstance.post('/register', values);
      if (response.status === 201) {
        // console.log(response.data.data);
        toast.success(response.data.message);
        resetForm();
        navigate('/login');
      }
    } catch (err) {
      // console.log(err);
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
            <h2 className="text-center text-2xl font-bold mb-2">Create an Account</h2>

            <Formik
              initialValues={{ name: '', email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  {/* Name */}
                  <div className="form-control">
                    <label htmlFor="name" className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="input input-bordered w-full pr-10"
                    />
                    <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Email */}
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

                  {/* Password */}
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
                  {/* Submit */}
                  <div className="form-control mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full"
                    >
                      {isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Login redirect */}
            <div className="text-center text-sm mt-4">
              Already have an account?{' '}
              <Link to="/login" className="link link-primary font-medium">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
