import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token");

    return isAuthenticated ? (
        children
    ) : (
        <Navigate
            to="/login"
            replace
        />
    );
};
