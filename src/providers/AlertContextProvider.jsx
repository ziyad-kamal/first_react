import {useState } from "react";
import Alert from "../components/Alert";
import { AlertContext } from "../contexts/AlertContext";

export default function AlertContextProvider({ children }) {
    const [message, setMessage] = useState({
        show: false,
        type: "",
        text: "",
    });

    const handleMessageState = (newMessage) => {
        setMessage(newMessage);
    };

    return (
        <>
            <AlertContext.Provider value={{ handleMessageState }}>
                <Alert
                    type={message.type}
                    text={message.text}
                    show={message.show}
                />
                {children}
            </AlertContext.Provider>
        </>
    );
}

