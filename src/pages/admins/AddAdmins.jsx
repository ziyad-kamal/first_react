import { useContext, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";
import Card from "../../components/Card";
import LabelInput from "../../components/LabelInput";
import Button from "../../components/Button";
import sendRequest from "../../functions/sendRequest";

const initialInputs = {
    name: "",
    password: "",
    email: "",
};

const initialErrors = {
    name: [],
    password: [],
    email: [],
};

export default function AddAdmins() {
    const { handleMessageState } = useContext(AlertContext);
    const [inputs, setInputs] = useState(initialInputs);
    const [errors, setErrors] = useState(initialErrors);

    const handleChange = (value, name) => {
        setInputs({ ...inputs, [name]: value });
    };

    let abortControllerForSubmit = null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `/admins/add`;
        abortControllerForSubmit ? abortControllerForSubmit.abort() : null;
        abortControllerForSubmit = new AbortController();

        const submitData = async () => {
            const response = await sendRequest(
                url,
                inputs,
                abortControllerForSubmit,
                'post'
            );
            setErrors(initialErrors);

            if (response && response.success) {
                handleMessageState(response.msg);
                setInputs(initialInputs);
            } else if (response) {
                handleMessageState(response.msg);
                if (response.errors) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        ...response.errors,
                    }));
                }
            }
        };

        submitData();
    };

    return (
        <>
            <div className="flex justify-center items-center h-100 mt-7">
                <Card
                    classes={"bg-blue-900 w-100"}
                    title={"update"}
                >
                    <form onSubmit={handleSubmit}>
                        <LabelInput
                            isRequired={false}
                            value={inputs.name}
                            name="name"
                            type="text"
                            handleChange={handleChange}
                            error={errors.name[0]}
                        />

                        <LabelInput
                            isRequired={true}
                            value={inputs.email}
                            name="email"
                            type="email"
                            handleChange={handleChange}
                            error={errors.email[0]}
                        />

                        <LabelInput
                            value={inputs.password}
                            isRequired={false}
                            name="password"
                            type="password"
                            handleChange={handleChange}
                            error={errors.password[0]}
                        />

                        <Button
                            classes={"bg-green-700  hover:bg-green-800"}
                            text={"add"}
                        />
                    </form>
                </Card>
            </div>
        </>
    );
}
