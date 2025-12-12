import { Link } from "react-router";

export const Landing = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center p-6">
            {/* Hero Section */}
            <div className="max-w-4xl text-center text-white">
                {/* Big headline */}
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    Take Control of Your Money
                </h1>

                {/* Subheadline */}
                <p className="text-xl md:text-2xl mb-12 text-violet-100">
                    Track expenses, set budgets, and reach your financial goals
                    — all in one place.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                        to="/sign-up"
                        className="bg-white text-violet-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
                    >
                        Get Started — It's Free
                    </Link>

                    <Link
                        to="/login"
                        className="border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition"
                    >
                        Already have an account? Log in
                    </Link>
                </div>

                {/* Optional: Feature highlights or screenshot */}
                <div className="mt-20 text-violet-200">
                    <p className="text-lg">✓ No credit card required</p>
                    <p className="text-lg">✓ Cancel anytime</p>
                    <p className="text-lg">✓ Built for real people</p>
                </div>
            </div>
        </div>
    );
};
