import type { ReactNode } from "react";

type MessageContainerProps = {
    children: ReactNode;
}

export const MessageContainer = ({ children }: MessageContainerProps) => {
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div 
                style={{ 
                    width: "100%", 
                    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)", 
                    borderRadius: 2, 
                    display: "flex", 
                    flexDirection: "column", 
                    height: "100vh",
                }}
            >
                {children}
            </div>
        </div>
    )
}