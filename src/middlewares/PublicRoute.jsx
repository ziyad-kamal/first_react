import { Navigate } from "react-router";

export const PublicRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token");

    return isAuthenticated ? (
        <Navigate
            to="/dashboard"
            replace
        />
    ) : (
        children
    );
};
