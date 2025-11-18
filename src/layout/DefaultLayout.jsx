import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";

export const DefaultLayout = ({ showSidebar, setShowSidebar, theme, setTheme }) => {
    return (
        <div className="flex">
            <Sidebar
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                    theme={theme}
                    setTheme={setTheme}
                />
            <Outlet />
        </div>
    )
}