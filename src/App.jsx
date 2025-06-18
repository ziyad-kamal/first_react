import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import { ProtectedRoute } from "./middlewares/ProtectedRoute";
import { PublicRoute } from "./middlewares/PublicRoute";
import GetAdmins from "./pages/admins/GetAdmins";
import EditAdmins from "./pages/admins/EditAdmins";
import AddAdmins from "./pages/admins/AddAdmins";
import { setAxiosConfig } from "./functions/setAxiosConfig";
import AlertContextProvider from "./providers/AlertContextProvider";
import { Suspense } from "react";

function App() {
    setAxiosConfig();

    return (
        <>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                                <AlertContextProvider>
                                    <Login />
                                </AlertContextProvider>
                        </PublicRoute>
                    }
                />

                <Route element={<AdminLayout />}>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/admins">
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <GetAdmins />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="add"
                            element={
                                <ProtectedRoute>
                                    <AddAdmins />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="edit/:id"
                            element={
                                <ProtectedRoute>
                                    <EditAdmins />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
