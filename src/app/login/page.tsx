"use client";
import { CreateAccountForm } from '../ui/create.account-form';
import { LoginForm } from '../ui/login-form';
import { useState } from 'react';

export default function LoginPage() {
  // State to track whether to display the login or create account form
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <div className="mx-auto flex py-16 max-w-[400px] flex-col">
        
        {/* Background Image Section */}
        <div className="w-full h-40 md:h-60 bg-[url(./heroImage.jpg)] bg-cover bg-center rounded-t-lg"></div>

        {/* Forms with transitions */}
        <div className="relative overflow-hidden">
          <div
            className={`transition-all duration-300 ease-in-out transform ${isLogin ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <LoginForm setIsLogin={setIsLogin} />
          </div>
          <div
            className={`transition-all duration-300 ease-in-out transform absolute w-full top-0 left-0 ${!isLogin ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <CreateAccountForm setIsLogin={setIsLogin} />
          </div>
        </div>
      </div>
    </main>
  );
}
