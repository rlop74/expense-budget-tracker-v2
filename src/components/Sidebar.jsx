import { useState } from "react";
import {
    ArrowLeftRight,
    LayoutDashboard,
    Wallet,
    Goal,
    HandCoins,
    ChartNoAxesCombined,
    Settings,
    Vault,
    MessageCircleQuestionMark,
    LogOut,
    Sun,
    Moon,
} from "lucide-react";

export const Sidebar = ({ showSidebar, setShowSidebar }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || <Sun />
    );

    const menuItems = [
        { icon: <LayoutDashboard />, name: "Dashboard" },
        { icon: <ArrowLeftRight />, name: "Transactions" },
        { icon: <Wallet />, name: "Wallet" },
        { icon: <Goal />, name: "Goals" },
        { icon: <HandCoins />, name: "Budget" },
        { icon: <ChartNoAxesCombined />, name: "Analytics" },
        { icon: <Settings />, name: "Settings" },
    ];

    const themeItems = [<Sun />, <Moon />];

    return (
        <div
            className={`flex flex-col justify-between p-5 list-none bg-violet-500/30 transition-all duration-300 ease-in-out ${
                showSidebar ? " w-[15%] translate-x-0" : "w-0 -translate-x-50"
            }`}
        >
            <div className="flex flex-col text-m w-[100%] gap-1">
                <div className="flex text-[20px] pt-5 pb-5">
                    <Vault className="" />
                    Budget Tracker
                </div>
                {menuItems.map((item) => {
                    return (
                        <button
                            key={item.name}
                            className="flex gap-2 p-4 rounded-l-full rounded-r-full"
                        >
                            {item.icon}
                            {item.name}
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-col text-m gap-20">
                <div>
                    <button className="flex gap-2 p-4 rounded-l-full rounded-r-full">
                        <MessageCircleQuestionMark />
                        Help
                    </button>
                    <button className="flex gap-2 p-4 rounded-l-full rounded-r-full">
                        <LogOut />
                        Logout
                    </button>
                </div>
                <div className="flex rounded-l-full rounded-r-full border-1 border-gray-400 w-fit">
                    {themeItems.map((themeItem) => {
                        return (
                            <button
                                className={`rounded-full p-3 ${
                                    theme === themeItem
                                        ? "bg-violet-500/30"
                                        : ""
                                }`}
                            >
                                {themeItem}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
