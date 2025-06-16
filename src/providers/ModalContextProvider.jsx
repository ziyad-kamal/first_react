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

    const handleClose = (e) => {
        const tagName = e.target.tagName;
        if (e.target.id === "modalOverlay"|| tagName === 'BUTTON'||tagName==='svg')  {
            setModal({ ...modal, open: false });
        }
    };

    return (
        <>
            <ModalContext.Provider value={{ handleModalState }}>
                <Modal
                    title={modal.title}
                    content={modal.content}
                    open={modal.open}
                    handleClick={modal.handleClick}
                    handleClose={handleClose}
                    btnText={modal.btnText}
                    btnClasses={modal.btnClasses}
                    btnType={modal.btnType}
                />
                {children}
            </ModalContext.Provider>
        </>
    );
}
