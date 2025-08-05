import { createContext, useContext, useState, type FC } from "react";
import type { AppbarSidebarProps } from "./appbar-sidebar";

interface AppbarSidebarContextProps {
    color: "standard" | "transitional";
    expanded: boolean;
    bgColor: string;
    setColor: (color: "standard" | "transitional") => void;
    setExpanded: (expanded: boolean) => void;
    setBgColor: (bgColor: string) => void;
}

const AppbarSidebarContext = createContext<AppbarSidebarContextProps | undefined>(undefined);

export const useAppbarSidebarContext = () => {
    const context = useContext(AppbarSidebarContext);
    if (!context) {
        throw new Error("useAppbarSidebarContext must be used within AppbarSidebarProvider");
    }
    return context;
}

const AppbarSidebarProvider: FC<AppbarSidebarProps> = ({ color = "standard", expanded = false, children }) => {
    const [currentColor, setColor] = useState<"standard" | "transitional">(color);
    const [currentExpanded, setExpanded] = useState<boolean>(expanded);
    const [bgColor, setBgColor] = useState<string>(color === "standard" ? "#E3E2E9" : "#F5F5F5");

    return (
        <AppbarSidebarContext.Provider
            value={{
                color: currentColor,
                expanded: currentExpanded,
                bgColor,
                setColor,
                setExpanded,
                setBgColor
            }}
        >
            {children}
        </AppbarSidebarContext.Provider>
    );
}
export { AppbarSidebarProvider, AppbarSidebarContext };