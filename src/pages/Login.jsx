import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import LabelInput from "../components/LabelInput";
import { useNavigate } from "react-router";
import sendRequest from "../functions/sendRequest";
import { AlertContext } from "../contexts/AlertContext";
import { useTranslation } from "react-i18next";

export default function Login() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [lang, setLang] = useState('');
    const { handleMessageState } = useContext(AlertContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lang = localStorage.getItem("i18nextLng");
        if (lang == "ar") {
            document.querySelector("html").dir = "rtl";
            setLang('ar')
        }
    }, []);

    const handleLang = () => {
        i18n.changeLanguage("ar");
        document.querySelector("html").dir = "rtl";
        setLang('ar')
    };

    const handleLangEn = () => {
        i18n.changeLanguage("en");
        document.querySelector("html").dir = "ltr";
        setLang('en')
    };

    const handleLangFr = () => {
        i18n.changeLanguage("fr");
        document.querySelector("html").dir = "ltr";
        setLang('fr')
    };

    const rtl = lang == 'ar' ? true : false;

    const handleChange = (value, name) => {
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "/admins/login";
        const abortController = new AbortController();

        const login = async () => {
            const response = await sendRequest(
                "post",
                url,
                inputs,
                abortController
            );

            if (response && response.success) {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            } else if (response) {
                handleMessageState(response.msg);
            }
        };

        login();
    };

    return (
        <>
            <Button
                classes={`bg-green-700 ${rtl ? 'mt-5' : null}  hover:bg-green-800`}
                text={"lang"}
                handleClick={handleLang}
            />

            <Button
                classes={"bg-green-700  hover:bg-green-800"}
                text={"langEn"}
                handleClick={handleLangEn}
            />

            <Button
                classes={"bg-green-700  hover:bg-green-800"}
                text={"langFr"}
                handleClick={handleLangFr}
            />
            <div className="ar flex justify-center items-center h-100 mt-7">
                <Card
                    classes={"bg-blue-900 w-100"}
                    title={t("login")}
                >
                    <form onSubmit={handleSubmit}>
                        <LabelInput
                            isRequired={true}
                            value={inputs.email}
                            name="email"
                            type="email"
                            handleChange={handleChange}
                        />

                        <LabelInput
                            value={inputs.password}
                            isRequired={true}
                            name="password"
                            type="password"
                            classes={
                                "focus:shadow-blue-500 focus:border-blue-500 bg-white"
                            }
                            handleChange={handleChange}
                        />

                        <Button
                            classes={"bg-green-700  hover:bg-green-800"}
                            text={"login"}
                        />
                    </form>
                </Card>
            </div>
        </>
    );
}

//     box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);
