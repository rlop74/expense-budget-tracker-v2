import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";

export const DefaultLayout = ({
    showSidebar,
    setShowSidebar,
    theme,
    setTheme,
    isOpen,
    setIsOpen,
}) => {
    return (
        <div
            className={`flex h-screen ${
                theme === "Moon" ? "bg-black/90 text-white" : ""
            }`}
        >
            <Sidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                theme={theme}
                setTheme={setTheme}
            />
            <Outlet />
        </div>
    );
};
