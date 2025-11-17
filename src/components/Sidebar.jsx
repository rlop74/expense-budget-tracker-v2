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

export const Sidebar = ({ toggleSidebar, setToggleSidebar }) => {
    return (
        <div
            className={`flex flex-col p-5 list-none bg-violet-500/30 transition-all duration-300 ease-in-out ${
                toggleSidebar ? " w-[12%]" : "w-0"
            }`}
        >
            {/* {toggleSidebar && ( */}
                {/* <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${toggleSidebar ? "translate-x-0" : "-translate-x-full"}`}
                > */}
                    <div className="flex text-[20px] pt-5 pb-5">
                        <Vault className="" />
                        Budget Tracker
                    </div>
                    <div className="flex flex-col justify-between h-screen">
                        <div className="flex flex-col text-m w-[100%] gap-1">
                            <button className="flex gap-2 p-4 rounded-l-full rounded-r-full">
                                <LayoutDashboard />
                                Dashboard
                            </button>
                            <button className="flex gap-2 p-4 rounded-l-full rounded-r-full">
                                <ArrowLeftRight />
                                Transactions
                            </button>
                            <button className="flex gap-2 p-4 rounded-l-full rounded-r-full">
                                <Wallet />
                                Wallet
                            </button>
                            <button className="flex gap-2 p-4 rounded-l-full rounded-r-full">
                                <Goal />
                                Goals
                            </button>
                            <button className="flex gap-2 p-4 rounded-l-full rounded-r-full">
                                <HandCoins />
                                Budget
                            </button>
                            <button className="flex gap-2 p-4 rounded-l-full rounded-r-full">
                                <ChartNoAxesCombined />
                                Analytics
                            </button>
                            <button className="flex gap-2 p-4 rounded-l-full rounded-r-full">
                                <Settings />
                                Settings
                            </button>
                        </div>

                        <div className="flex flex-col text-m pr-5 gap-1">
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
                {/* </div> */}
            {/* )} */}
        </div>
    );
};
