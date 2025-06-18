import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/output.css";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./i18n";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store} >
                <App />
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
