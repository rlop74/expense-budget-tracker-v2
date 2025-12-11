import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useUserStore } from "../stores/user-store";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const setUser = useUserStore((state) => state.setUser);

    const handleLogin = async (e) => {
        e.preventDefault(); // prevent page reload on submit
        try {
            setLoading(true);

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                alert(error.message);
                setLoading(false);
                return;
            }
            setUser(data);
            setLoading(false);

            // success, supabase handles session
            // AuthLayout will automatically redirect to Dashboard
            console.log("Successfully logged in!", data.user);
        } catch (err) {
            setLoading(false);
            throw new Error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-2xl text-gray-800 font-bold mb-6">Login</h2>

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
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};
