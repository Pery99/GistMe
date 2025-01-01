import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerSchema } from "../utils/validation";
import AuthService from "../services/auth";
import { FiUser, FiMail, FiLock, FiUpload, FiLoader } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [profilePreview, setProfilePreview] = useState(null);

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("avatar", file);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();

      // Required fields
      const requiredFields = {
        username: values.username?.trim(),
        email: values.email?.trim(),
        password: values.password,
      };

      // Validate required fields
      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        setError(`Missing required fields: ${missingFields.join(", ")}`);
        return;
      }

      // Append all fields to FormData
      Object.entries(requiredFields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Optional fields
      if (values.bio?.trim()) {
        formData.append("bio", values.bio.trim());
      }

      if (values.avatar instanceof File) {
        formData.append("avatar", values.avatar);
      }

      const response = await AuthService.register(formData);

      if (response?.token) {
        navigate("/friends");
      } else {
        throw new Error("No token received from server");
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Registration failed. Please check your information and try again."
      );
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
              Create Account
            </h1>
            <p className="text-gray-500 mt-2">Join GistMe today</p>
          </div>

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              bio: "",
              avatar: null,
            }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}s
          >
            {({ isSubmitting, setFieldValue, errors, touched }) => (
              <Form className="space-y-6" encType="multipart/form-data">
                {/* Profile Picture Upload */}
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                      <img
                        src={
                          profilePreview ||
                          `https://ui-avatars.com/api/?name=New+User`
                        }
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                      <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                        <FiUpload className="text-white text-xl" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, setFieldValue)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Username field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Field
                        name="username"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border
                          ${
                            errors.username && touched.username
                              ? "border-red-500"
                              : "border-gray-200"
                          }
                          focus:outline-none focus:ring-2 focus:ring-primary-500/30`}
                        placeholder="Choose a username"
                      />
                      <ErrorMessage
                        name="username"
                        component="p"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Field
                        name="email"
                        type="email"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border
                          ${
                            errors.email && touched.email
                              ? "border-red-500"
                              : "border-gray-200"
                          }
                          focus:outline-none focus:ring-2 focus:ring-primary-500/30`}
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Field
                        name="password"
                        type="password"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border
                          ${
                            errors.password && touched.password
                              ? "border-red-500"
                              : "border-gray-200"
                          }
                          focus:outline-none focus:ring-2 focus:ring-primary-500/30`}
                        placeholder="Create a password"
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Field
                        name="confirmPassword"
                        type="password"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/50 border
                          ${
                            errors.confirmPassword && touched.confirmPassword
                              ? "border-red-500"
                              : "border-gray-200"
                          }
                          focus:outline-none focus:ring-2 focus:ring-primary-500/30`}
                        placeholder="Confirm your password"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="p"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <Field
                      name="bio"
                      as="textarea"
                      className={`w-full p-4 rounded-xl bg-gray-50/50 border
                        ${
                          errors.bio && touched.bio
                            ? "border-red-500"
                            : "border-gray-200"
                        }
                        focus:outline-none focus:ring-2 focus:ring-primary-500/30 resize-none h-24`}
                      placeholder="Tell us about yourself (optional)"
                    />
                    <ErrorMessage
                      name="bio"
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
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                    className="w-full py-3 bg-gradient-to-r from-primary-500 to-purple-500 
                             text-white rounded-xl hover:shadow-lg transition-all
                             disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <FiLoader className="w-5 h-5 animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-primary hover:underline">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
