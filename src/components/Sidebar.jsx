import { useState } from "react";
import { Link } from "react-router";

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

export const Sidebar = ({ showSidebar, setShowSidebar, theme, setTheme }) => {
    const menuItems = [
        { icon: <LayoutDashboard />, name: "Dashboard", path: "/dashboard" },
        {
            icon: <ArrowLeftRight />,
            name: "Transactions",
            path: "/transactions",
        },
        { icon: <Wallet />, name: "Wallet", path: "/wallet" },
        { icon: <Goal />, name: "Goals", path: "/goals" },
        { icon: <HandCoins />, name: "Budget", path: "/budget" },
        {
            icon: <ChartNoAxesCombined />,
            name: "Analytics",
            path: "/analytics",
        },
        { icon: <Settings />, name: "Settings", path: "/settings" },
    ];

    const themeItems = [<Sun />, <Moon />];

    return (
        <>
            <div
                className={`flex flex-col justify-between list-none bg-violet-500/30 transition-all duration-300 ease-in-out ${
                    showSidebar
                        ? "w-[12%] translate-x-0 p-5"
                        : "w-0 -translate-x-50 p-0"
                }`}
            >
                <div className="flex flex-col text-m w-[100%] gap-1">
                    <div className="flex justify-between text-[20px] pt-5 pb-5">
                        <div className="flex">
                            <Vault className="" />
                            Budget Tracker
                        </div>
                    </div>
                    {menuItems.map((item) => {
                        return (
                            <Link to={item.path}>
                                <button
                                    key={item.name}
                                    className="flex gap-2 p-4 rounded-l-full rounded-r-full w-full"
                                >
                                    {item.icon}
                                    {item.name}
                                </button>
                            </Link>
                        );
                    })}
                </div>

                <div className="flex flex-col text-m gap-20">
                    <div>
                        <button className="flex gap-2 p-4 rounded-l-full rounded-r-full w-full">
                            <MessageCircleQuestionMark />
                            Help
                        </button>
                        <button className="flex gap-2 p-4 rounded-l-full rounded-r-full w-full">
                            <LogOut />
                            Logout
                        </button>
                    </div>
                    <div className="flex rounded-l-full rounded-r-full border-1 border-gray-400 w-fit">
                        {themeItems.map((themeItem) => {
                            return (
                                <button
                                    className={`rounded-full p-3 transition-all duration-300 ease-in-out ${
                                        theme === themeItem.type.displayName
                                            ? "bg-violet-500/30"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setTheme(themeItem.type.displayName)
                                    }
                                >
                                    {themeItem}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="inline">
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="p-1 bg-violet-500/30 rounded-br-xl"
                >
                    {showSidebar ? <PanelLeftClose /> : <PanelLeftOpen />}
                </button>
            </div>
        </>
    );
};
