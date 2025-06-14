import { useState } from "react";
import Modal from "../components/Modal";
import { ModalContext } from "../contexts/ModalContext";

export default function ModalContextProvider({ children }) {
    const [modal, setModal] = useState({
        open: false,
        title: "",
        content: "",
        btnClasses: "",
        btnType: "",
        btnText: "",
        handleClick: () => {},
    });

    const handleModalState = (newModal) => {
        setModal(newModal);
    };

    return (
        <>
            <ModalContext.Provider value={{ handleModalState }}>
                <Modal
                    title={modal.title}
                    content={modal.content}
                    open={modal.open}
                    handleClick={modal.handleClick}
                    btnText={modal.btnText}
                    btnClasses={modal.btnClasses}
                    btnType={modal.btnType}

                />
                {children}
            </ModalContext.Provider>
        </>
    );
}
