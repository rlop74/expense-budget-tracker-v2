import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { useUserStore } from "../stores/user-store";

export const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const user = useUserStore((state) => state.user);

    return (
        <header className="w-full">
            <div className="flex justify-between px-5 py-6">
                {/* left side, greeting */}
                <div className="">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome back, {user?.first_name || "User"}!
                    </h1>
                    <p className="mt-1 text-gray-500">
                        It's the best time to manage your finances
                    </p>
                </div>

                {/* right side, buttons */}
                <div className="flex items-center gap-1">
                    {/* search bar */}
                    <div
                        className={`flex items-center rounded-full border border-gray-400 p-3 bg-white text-gray-500 cursor-pointer select-none hover:bg-violet-500/50 hover:text-white transition-all duration-300 ease-in-out ${
                            isSearchOpen ? "w-74 gap-1" : "w-12"
                        }`}
                    >
                        <Search
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        />
                        <input
                            type="text"
                            placeholder="Search transactions, accounts..."
                            className={`rounded-full outline-none transition-all duration-350 ease-in-out ${
                                isSearchOpen ? "w-full text-black" : "w-0"
                            }`}
                        />
                    </div>

                    {/* notifications */}
                    <button className="flex items-center rounded-full border border-gray-400 p-3 bg-white text-gray-500 cursor-pointer hover:bg-violet-500/50 hover:text-white transition-all duration-300 ease-in-out">
                        <Bell />
                    </button>

                    {/* user profile */}
                    <button className="flex items-center gap-3 rounded-full border border-gray-400 bg-white px-4 py-2 cursor-pointer transition hover:border-violet-400 hover:shadow-sm">
                        <img
                            src={user?.img}
                            alt="User avatar"
                            className="h-10 w-10 rounded-full"
                        />
                        <div className="hidden text-left sm:block">
                            <div className="text-sm font-medium text-gray-900">
                                {user?.first_name} {user?.last_name}
                            </div>
                            <div className="text-xs text-gray-500">
                                {user?.email}
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};
