import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import AlertContextProvider from "../providers/AlertContextProvider";

export default function AdminLayout() {
    return (
        <>
            <Navbar />
            <div className="container px-16 max-sm:px-4  mx-auto  relative mt-25">
                <AlertContextProvider>
                    <Outlet />
                </AlertContextProvider>
            </div>
        </>
    );
}
