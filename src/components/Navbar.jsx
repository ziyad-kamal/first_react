import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router";
import Admins from "../pages/Admins";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleOutsideClick = (e) => {
        if (
            !e.target.closest(".icon_parent") &&
            !e.target.closest(".search_form")
        ) {
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <nav
                className={`navbar z-10 p-1 bg-blue-800 h-16 fixed right-0 
                    left-0 top-0 flex justify-evenly items-center 
                    ${isMenuOpen ? "responsive_navbar" : ""}`}
                onClick={handleOutsideClick}
            >
                <h2 className="text-blue-200 text-4xl  font-extrabold ">
                    Brand
                </h2>

                <div
                    className={`flex gap-8 text-blue-200 text-lg font-bold 
                        links max-md:hidden ${
                            isMenuOpen ? "responsive_links" : ""
                        }`}
                >
                    <Link to={'/admins'} >admins</Link>
                    <a>courses</a>
                    <a>features</a>
                    <a>pricing</a>
                </div>

                <form
                    className={`flex max-md:hidden search_form 
                    ${isMenuOpen ? "responsive_search_input" : ""}`}
                >
                    <input
                        name="search"
                        type="text"
                        placeholder="search"
                        className="h-8 w-full p-3 focus:outline-0  bg-blue-200 
                            rounded-tl-3xl rounded-bl-3xl text-blue-800 border 
                            border-solid bg-clip-padding shadow-sm border-blue-200 
                            focus:border-blue-100 focus:shadow-blue-100"
                    />
                    <button
                        className="h-8 w-14  rounded-tr-3xl cursor-pointer 
                            rounded-br-3xl bg-blue-300"
                    >
                        <FontAwesomeIcon
                            className="text-blue-800"
                            icon={faMagnifyingGlass}
                        />
                    </button>
                </form>

                <div className="icon_parent hidden max-md:block">
                    <div
                        className={`icon bg-blue-200 rounded-sm cursor-pointer 
                        h-8 w-8 flex flex-col items-center leading-1.5 
                        ${!isMenuOpen ? null : "hidden"}`}
                        onClick={handleMenuToggle}
                    >
                        <div>_</div>
                        <div>_</div>
                        <div>_</div>
                    </div>
                </div>
            </nav>
        </>
    );
}
