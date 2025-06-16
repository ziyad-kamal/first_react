import { useState } from "react";
import Alert from "../components/Alert";
import { AlertContext } from "../contexts/AlertContext";

const initialState = {
    show: false,
    type: "",
    text: "",
};

export default function AlertContextProvider({ children }) {
    const [message, setMessage] = useState(initialState);

    const handleMessageState = (newMessage) => {
        setMessage(newMessage);
        setTimeout(() => {
            setMessage(initialState);
        }, 4000);
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
