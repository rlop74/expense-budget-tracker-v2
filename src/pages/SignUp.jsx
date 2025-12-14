import { useState } from "react";
import { Link } from "react-router";
import { supabase } from "../lib/supabase";

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                },
            },
        });

        if (error) {
            alert(error.message);
        } else {
            alert("Check your email for confirmation link!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSignup}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-2xl text-gray-800 font-bold mb-6">
                    Sign Up
                </h2>

                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border-2 border-gray-400 rounded mb-6"
                />

                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border-2 border-gray-400 rounded mb-6"
                />

                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border-2 border-gray-400 rounded mb-6"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border-2 border-gray-400 rounded mb-6"
                />

                <button
                    type="submit"
                    className="w-full bg-violet-500 text-white py-2 rounded cursor-pointer"
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>

                <p className="text-center mt-2">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-500 hover:text-blue-300"
                    >
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    );
};
