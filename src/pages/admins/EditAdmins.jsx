import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AlertContext } from "../../contexts/AlertContext";
import Card from "../../components/Card";
import LabelInput from "../../components/LabelInput";
import Button from "../../components/Button";
import getData from "../../functions/getData";
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

export default function EditAdmins() {
    const { handleMessageState } = useContext(AlertContext);
    const [inputs, setInputs] = useState(initialInputs);
    const [errors, setErrors] = useState(initialErrors);
    const { id } = useParams();

    // MARK: get admins
    useEffect(() => {
        const url = `/admins/show/${id}`;
        const abortController = new AbortController();

        const fetchData = async () => {
            const response = await getData(url, abortController);
            if (response && response.success) {
                setInputs({ ...inputs, ...response.data.admin });
            } else if (response) {
                handleMessageState(response.msg);
            }
        };

        fetchData();

        return () => abortController.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (value, name) => {
        setInputs({ ...inputs, [name]: value });
    };

    let abortControllerForSubmit = null;

    // MARK: handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `/admins/update/${id}?_method=put`;
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
        <div>
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
                            text={"update"}
                        />
                    </form>
                </Card>
            </div>
        </div>
    );
}
