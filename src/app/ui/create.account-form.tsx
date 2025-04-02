"use client";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Dispatch, SetStateAction, useState } from "react";

interface CreateAccountFormProps {
  readonly setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export function CreateAccountForm({ setIsLogin }: CreateAccountFormProps) {
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.name === "name") {
      setFocusName(true);
    } else if (event.target.name === "email") {
      setFocusEmail(true);
    } else if (event.target.name === "password") {
      setFocusPassword(true);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.name === "name") {
      setFocusName(false);
    } else if (event.target.name === "email") {
      setFocusEmail(false);
    } else if (event.target.name === "password") {
      setFocusPassword(false);
    }
  };

  return (
    <form className="bg-white rounded-b-lg shadow-lg p-6 space-y-6">
      <h2 className="text-xl font-bold text-center text-gray-800">Create Account</h2>

      {/* Name Input */}
      <div className={`relative flex items-center border border-gray-300 gap-2 bg-white rounded-md ${focusName ? "ring-2 ring-blue-500" : ""}`}>
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

      {/* Email Input */}
      <div className={`relative flex items-center border border-gray-300 gap-2 bg-white rounded-md ${focusEmail ? "ring-2 ring-blue-500" : ""}`}>
        <div className="flex items-center justify-center pl-4">
          <FaEnvelope className="text-gray-400" />
        </div>
        <input
          type="email"
          name="email"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full py-3 pr-2 border-none rounded-md text-gray-800 focus:outline-none bg-white placeholder-gray-500"
          placeholder="Email address"
        />
      </div>

      {/* Password Input */}
      <div className={`relative flex items-center border border-gray-300 gap-2 bg-white rounded-md ${focusPassword ? "ring-2 ring-blue-500" : ""}`}>
        <div className="flex items-center justify-center pl-4">
          <FaLock className="text-gray-400" />
        </div>
        <input
          type="password"
          name="password"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full py-3 pr-2 border-none rounded-md text-gray-800 focus:outline-none bg-white placeholder-gray-500"
          placeholder="Password"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full py-3 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Create Account</button>

      {/* Toggle to Login */}
      <p className="text-center text-sm text-gray-800">
        <span>Already have an account?</span>
        <button
        type="button"
            onClick={() => setIsLogin(true)}
            className="text-blue-500 hover:underline ml-1"
        >
            Sign in
        </button>
      </p>
    </form>
  );
}
