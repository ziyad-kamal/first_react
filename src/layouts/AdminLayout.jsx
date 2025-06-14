import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import AlertContextProvider from "../providers/AlertContextProvider";
import ModalContextProvider from "../providers/ModalContextProvider";

export default function AdminLayout() {
    return (
        <>
            <Navbar classes={"bg-blue-800"} />
            <div className="container px-16 max-sm:px-4  mx-auto  relative mt-25">
                <ModalContextProvider>
                    <AlertContextProvider>
                        <Outlet />
                    </AlertContextProvider>
                </ModalContextProvider>
            </div>
        </>
    );
}
