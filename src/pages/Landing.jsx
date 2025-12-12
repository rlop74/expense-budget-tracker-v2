import { Link } from "react-router";

export const Landing = () => {
    return (
        <div className="flex justify-between">
            Landing Page
            <div>
                <Link to="/login" className="border-1 p-2">
                    Login
                </Link>
                <Link to="/signup" className="border-1 p-2">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};
