import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { useThemeStore } from "@/stores/theme-store";

export const DefaultLayout = ({
    showSidebar,
    setShowSidebar,
    isOpen,
    setIsOpen,
}) => {
    const theme = useThemeStore((state) => state.theme); // "Sun"

    return (
        <>
            <div
                className={`flex h-screen ${
                    theme === "Moon" ? "bg-black/90 text-white" : ""
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
