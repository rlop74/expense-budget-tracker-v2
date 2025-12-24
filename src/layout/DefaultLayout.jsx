import { useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { useThemeStore } from "@/stores/theme-store";

export const DefaultLayout = () => {
    const theme = useThemeStore((state) => state.theme);
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <>
            <div
                className={`flex h-screen transition-colors duration-300 ${
                    theme === "dark"
                        ? "bg-gray-950 text-gray-100" // Main recommendation
                        : "bg-gray-50 text-gray-900" // Light mode (add this for consistency)
                }`}
            >
                <Sidebar
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                    theme={theme}
                />
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </>
    );
};
