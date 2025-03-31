"use client";
import { Metadata } from "next";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa"; // Import icons
import { useState } from "react";

export const metadata: Metadata = {
  title: "Login",
};

export function LoginForm({ login = true }) {
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusName, setFocusName] = useState(false);
  const [isLogin, setIsLogin] = useState(login);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.type == "email") {
      setFocusEmail(true);
    } else if (event.target.type == "password") {
      setFocusPassword(true);
    } else if (event.target.name == "name") {
      setFocusName(true);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.type == "email") {
      setFocusEmail(false);
    } else if (event.target.type == "password") {
      setFocusPassword(false);
    } else if (event.target.name == "name") {
      setFocusName(false);
    }
  };

  return (
    <form className="bg-white rounded-b-lg shadow-lg p-6 space-y-6">
      {/* Title */}
      <h2 className="text-xl font-bold text-center text-gray-800">
        {isLogin ? "Login" : "Create Account"}
      </h2>

      {/* Name Input (Only for Create Account) */}
      {!isLogin && (
        <div
          className={`relative flex items-center border border-gray-300 gap-2 bg-white rounded-md ${focusName ? "ring-2 ring-blue-500" : ""}`}
        >
          <div className="flex items-center justify-center pl-4">
            <FaUser className="text-gray-400" />
          </div>
          <input
            type="text"
            name="name"
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full py-3 pr-2 border-none rounded-md text-gray-800 focus:outline-none bg-white placeholder-gray-500"
            placeholder="Full Name"
          />
        </div>
      )}

      {/* Email Input */}
      <div
        className={`relative flex items-center border border-gray-300 gap-2 bg-white rounded-md ${focusEmail ? "ring-2 ring-blue-500" : ""}`}
      >
        <div className="flex items-center justify-center pl-4">
          <FaEnvelope className="text-gray-400" />
        </div>
        <input
          type="email"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full py-3 pr-2 border-none rounded-md text-gray-800 focus:outline-none bg-white placeholder-gray-500"
          placeholder="Email address"
        />
      </div>

      {/* Password Input */}
      <div
        className={`relative flex items-center border border-gray-300 gap-2 bg-white rounded-md ${focusPassword ? "ring-2 ring-blue-500" : ""}`}
      >
        <div className="flex items-center justify-center pl-4">
          <FaLock className="text-gray-400" />
        </div>
        <input
          type="password"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full py-3 pr-2 border-none rounded-md text-gray-800 focus:outline-none bg-white placeholder-gray-500"
          placeholder="Password"
        />
      </div>

      {/* Remember Me & Forgot Password (Only for Login) */}
      {isLogin && (
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="h-4 w-4" />
            <label htmlFor="remember" className="text-sm text-black ml-2">
              Remember me
            </label>
          </div>
          <a href="#!" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isLogin ? "Sign in" : "Create Account"}
      </button>

      {/* Toggle Between Login & Create Account */}
      <p className="text-center text-sm text-gray-800">
        {isLogin ? (
          <>
            <span>Don't have an account?</span> 
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className="text-blue-500 hover:underline ml-1"
            >
              Create an account
            </button>
          </>
        ) : (
          <>
            <span>Already have an account?</span>
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className="text-blue-500 hover:underline ml-1"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </form>
  );
}
