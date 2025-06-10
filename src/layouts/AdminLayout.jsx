import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function AdminLayout() {
    return (
        <>
            <Navbar />

            <div className="container px-16 max-sm:px-4  mx-auto  relative mt-25">
                <Outlet />
            </div>
        </>
    );
}
