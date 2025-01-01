import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../utils/validation";
import AuthService from "../services/auth";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await AuthService.login(values.email, values.password);
      navigate("/friends");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-2">Sign in to continue to GistMe</p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      type="email"
                      name="email"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border
                        ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "border-gray-200"
                        }
                        focus:outline-none focus:ring-2 focus:ring-primary-500/30`}
                      placeholder="Enter your email"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      type="password"
                      name="password"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border
                        ${
                          errors.password && touched.password
                            ? "border-red-500"
                            : "border-gray-200"
                        }
                        focus:outline-none focus:ring-2 focus:ring-primary-500/30`}
                      placeholder="Enter your password"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-primary-500 to-purple-500 
                           text-white rounded-xl hover:shadow-lg transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <FiLoader className="w-5 h-5 animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
