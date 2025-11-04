"use client";
import React, { useState } from "react";
import axios from "axios";


// add username state


// later in the form (render this above the Email field)


export function AuthPage({ isSignin }: { isSignin: boolean }) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [remember, setRemember] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState<string>("");

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!emailValid) {
            setError("Please enter a valid email address.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        try {
if (!isSignin){
          const user : {
                email: string,
                username:string,
                password:string

            } = {
                email:email,
                username:username,
                password:password
            }
          
            const response = await axios.post("http://localhost:4000/signup",user)}

            else{

                 const user : {
                email: string, 
                password:string

            } = {
                email:email,
                password:password
            }
          
            const response = await axios.post("http://localhost:4000/signin",user)

            }
          
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/30">
                        {/* simple logo */}
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M3 12h18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M7 6h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M7 18h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-white">{isSignin ? "Welcome back" : "Create your account"}</h1>
                        <p className="text-sm text-white/80">{isSignin ? "Sign in to continue" : "Join us — it’s quick and easy"}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {!isSignin && (
    <div>
        <label className="text-sm text-gray-700 block mb-1">Username</label>
        <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            required
        />
    </div>
)}
                    <div>
                        <label className="text-sm text-gray-700 block mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                           
                            className="w-full px-4 py-2 text-gray-700 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
                            aria-invalid={!emailValid && email.length > 0}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-700 block mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter a strong password"
                                className="w-full px-4 text-gray-700 py-2 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10.58 10.58a3 3 0 0 0 4.24 4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9.88 5.5A11 11 0 0 0 3 12c2.5 3.84 6.6 6.5 9 6.5a9.2 9.2 0 0 0 3.28-.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M2.98 12c2.5 3.84 6.6 6.5 9 6.5 2.06 0 3.76-1.06 5.03-2.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 6.5c2.4 0 6.5 2.66 9 6.5-2.5 3.84-6.6 6.5-9 6.5-2.4 0-6.5-2.66-9-6.5 2.5-3.84 6.6-6.5 9-6.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="inline-flex items-center gap-2 text-gray-700">
                            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 rounded border-gray-300" />
                            Remember me
                        </label>
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-lg text-white font-medium transition ${
                            loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                        {loading ? "Please wait..." : isSignin ? "Sign in" : "Create account"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-white/90">
                    {isSignin ? "New here?" : "Already have an account?"}{" "}
                    <a className="font-semibold underline" href="#">
                        {isSignin ? "Create account" : "Sign in"}
                    </a>
                </p>
            </div>
        </div>
    );
}