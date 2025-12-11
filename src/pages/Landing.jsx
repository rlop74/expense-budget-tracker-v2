import { Link } from "react-router";

export const Landing = () => {
    return (
        <div>
            Landing Page
            <Link to="/login" className="border-1 p-2">
                Login
            </Link>
        </div>
    );
};
