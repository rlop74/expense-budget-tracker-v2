import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useThemeStore } from "@/stores/theme-store";

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
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";

export const Sidebar = ({ showSidebar, setShowSidebar, theme }) => {
    const menuItems = [
        {
            icon: <LayoutDashboard size={20} />,
            name: "Dashboard",
            path: "/dashboard",
        },
        {
            icon: <ArrowLeftRight size={20} />,
            name: "Transactions",
            path: "/transactions",
        },
        { icon: <Wallet size={20} />, name: "Bills", path: "/bills" },
        { icon: <Goal size={20} />, name: "Goals", path: "/goals" },
        { icon: <HandCoins size={20} />, name: "Budget", path: "/budget" },
        {
            icon: <ChartNoAxesCombined size={20} />,
            name: "Analytics",
            path: "/analytics",
        },
        { icon: <Settings size={20} />, name: "Settings", path: "/settings" },
    ];

    const themeItems = [<Sun />, <Moon />];
    const changeTheme = useThemeStore((state) => state.changeTheme);

    return (
        <>
            {/* sidebar */}
            <div
                className={`flex flex-col justify-between list-none bg-gray-900 text-gray-100 h-auto transition-all duration-300 ease-in-out ${
                    showSidebar
                        ? "w-[15%] translate-x-0 p-5"
                        : "w-0 -translate-x-50 p-0"
                }`}
            >
                <div className="flex flex-col">
                    {/* logo */}
                    <div className="flex items-center gap-3 mb-10">
                        <Vault size={28} className="text-violet-400" />
                        <span className="text-xl font-semibold tracking-tight">
                            Budget Tracker
                        </span>
                    </div>

                    {/* navigation */}
                    <nav className="space-y-1">
                        {menuItems.map((item, index) => {
                            return (
                                <NavLink
                                    to={item.path}
                                    key={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? "bg-violet-600 text-white"
                                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                        }`
                                    }
                                >
                                    {item.icon}
                                    {item.name}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                {/* bottom section */}
                <div className="flex flex-col text-m gap-15">
                    <div>
                        <NavLink
                            to="/help"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? "bg-violet-600 text-white"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`
                            }
                        >
                            <MessageCircleQuestionMark size={20} />
                            Help
                        </NavLink>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200">
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>

                    {/* theme toggle */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => changeTheme("light")}
                            className={`p-2 rounded-lg transition-all ${
                                theme === "light"
                                    ? "bg-gray-700 text-yellow-400"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            <Sun size={18} />
                        </button>
                        <button
                            onClick={() => changeTheme("dark")}
                            className={`p-2 rounded-lg transition-all ${
                                theme === "dark"
                                    ? "bg-gray-700 text-blue-400"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            <Moon size={18} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="inline">
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="p-1 bg-gray-900 text-gray-100 rounded-br-xl"
                >
                    {showSidebar ? <PanelLeftClose /> : <PanelLeftOpen />}
                </button>
            </div>
        </>
    );
};
