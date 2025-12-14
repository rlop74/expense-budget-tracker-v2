import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { useUserStore } from "../stores/user-store";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useUserStore((state) => state.user);

    return (
        <>
            <div className="flex justify-between pl-5 pr-5">
                <div className="">
                    <h1 className="text-[40px]">
                        Welcome back, {user.first_name}!
                    </h1>
                    <p className="text-gray-500">
                        It's the best time to manage your finances
                    </p>
                </div>

                <div className="flex justify-center items-center gap-1">
                    <Search
                        className="text-gray-500 border-1 rounded-full h-[50px] w-[50px] p-3 cursor-pointer hover:bg-violet-500/50 hover:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                    <input
                        className={`transition-all duration-350 ease-in-out rounded-full ${
                            isOpen ? "w-50 border-1" : "w-0"
                        }`}
                    />
                    <button className="text-gray-500 border-1 rounded-full h-[50px] w-[50px] p-3 cursor-pointer hover:bg-violet-500/15">
                        <Bell />
                    </button>
                    <button className="flex text-gray-500 border-1 rounded-full h-[50px] w-[200px] p-[3px] cursor-pointer hover:bg-violet-500/15 gap-2">
                        <img src={user.img} className="rounded-full" />
                        <div className="flex flex-col items-start">
                            <div>
                                {user.first_name} {user.last_name}
                            </div>
                            <div className="text-sm">{user.email}</div>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};
