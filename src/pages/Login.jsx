import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import LabelInput from "../components/LabelInput";
import Alert from "../components/Alert";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [message, setMessage] = useState({
        show: false,
        type: "",
        text: "",
    });

    const handleChange = (value, name) => {
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("admins/login", inputs);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);

                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response) {
                setMessage({
                    show: true,
                    type: "danger",
                    text: "incorrect email or password",
                });
            } else if (error.request) {
                setMessage({
                    show: true,
                    type: "danger",
                    text: "no response received,try again later.",
                });
            } else {
                setMessage({
                    show: true,
                    type: "danger",
                    text: "something went wrong",
                });
            }
        }
    };

    return (
        <>
            <Alert
                type={message.type}
                text={message.text}
                show={message.show}
            />
            <div className="flex justify-center items-center h-100 mt-7">
                <Card classes={"bg-blue-900 w-100"} title={"Login"}>
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
