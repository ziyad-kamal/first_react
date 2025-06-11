import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import axios from "axios";
import AdminLayout from "./layouts/AdminLayout";
import Admins from "./pages/Admins";

function App() {
    const token = localStorage.getItem('token');
    axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const ProtectedRoute = ({ children }) => {
        const isAuthenticated = localStorage.getItem("token");
        return isAuthenticated ? children : <Navigate to="/login" replace />;
    };

    const PublicRoute = ({ children }) => {
        const isAuthenticated = localStorage.getItem("token");
        return isAuthenticated ? (
            <Navigate to="/dashboard" replace />
        ) : (
            children
        );
    };

    return (
        <>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route element={<AdminLayout/>}  >
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admins"
                        element={
                            <ProtectedRoute>
                                <Admins />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </>
    );
}

export default App;
