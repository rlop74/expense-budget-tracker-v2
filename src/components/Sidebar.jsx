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
    const menuItems = [
        { icon: <LayoutDashboard />, name: "Dashboard" },
        { icon: <ArrowLeftRight />, name: "Transactions" },
        { icon: <Wallet />, name: "Wallet" },
        { icon: <Goal />, name: "Goals" },
        { icon: <HandCoins />, name: "Budget" },
        { icon: <ChartNoAxesCombined />, name: "Analytics" },
        { icon: <Settings />, name: "Settings" },
    ];

    return (
        <div
            className={`flex flex-col p-5 list-none bg-violet-500/30 transition-all duration-300 ease-in-out ${
                showSidebar ? " w-[12%]" : "w-0"
            }`}
        >
            <div
                className={`transition-all duration-300 ease-in-out ${
                    showSidebar ? "translate-x-0" : "-translate-x-50"
                }`}
            >
                <div className="flex text-[20px] pt-5 pb-5">
                    <Vault className="" />
                    Budget Tracker
                </div>
                <div className="flex flex-col h-full justify-between">
                    <div className="flex flex-col text-m w-[100%] gap-1 pb-30">
                        {menuItems.map((item) => {
                            return (
                                <button className="flex gap-2 p-4 rounded-l-full rounded-r-full">
                                    {item.icon}
                                    {item.name}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex flex-col text-m gap-1">
                        <button className="flex gap-2 p-4 rounded-l-full rounded-r-full">
                            <MessageCircleQuestionMark />
                            Help
                        </button>
                        <button className="flex gap-2 p-4 rounded-l-full rounded-r-full">
                            <LogOut />
                            Logout
                        </button>
                        <div className="mt-20 flex rounded-l-full rounded-r-full border-1 border-gray-400 w-fit">
                            <button className="rounded-full p-3">
                                <Sun />
                            </button>
                            <button className="rounded-full p-3">
                                <Moon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
