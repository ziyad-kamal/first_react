import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AlertContext } from "../../contexts/AlertContext";
import Card from "../../components/Card";
import LabelInput from "../../components/LabelInput";
import Button from "../../components/Button";
import sendRequest from "../../functions/sendRequest";

const initialErrors = {
    name: [],
    password: [],
    email: [],
};

export default function EditAdmins() {
    const { handleMessageState } = useContext(AlertContext);
    const [errors, setErrors] = useState(initialErrors);
    const navigate = useNavigate();
    const { id } = useParams();

    // Refs for uncontrolled inputs
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    // Ref for abort controller in submit
    const abortControllerForSubmit = useRef(null);

    // MARK: get admins
    useEffect(() => {
        const url = `/admins/show/${id}`;
        const abortController = new AbortController();

        const fetchData = async () => {
            const response = await sendRequest(
                "get",
                url,
                "",
                abortController,
                navigate
            );
            if (response && response.success) {
                nameRef.current.value = response.data.admin.name;
                emailRef.current.value = response.data.admin.email;
            } else if (response) {
                handleMessageState(response.msg);
            }
        };

        fetchData();

        return () => abortController.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // MARK: handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `/admins/update/${id}?_method=put`;
        if (abortControllerForSubmit.current) {
            abortControllerForSubmit.current.abort();
        }
        abortControllerForSubmit.current = new AbortController();

        const inputs = {
            name: nameRef.current?.value || "",
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || "",
        };

        const submitData = async () => {
            const response = await sendRequest(
                "post",
                url,
                inputs,
                abortControllerForSubmit.current,
                navigate
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
                            name="name"
                            type="text"
                            inputRef={nameRef}
                            error={errors.name[0]}
                        />

                        <LabelInput
                            isRequired={true}
                            name="email"
                            type="email"
                            inputRef={emailRef}
                            error={errors.email[0]}
                        />

                        <LabelInput
                            isRequired={false}
                            name="password"
                            type="password"
                            inputRef={passwordRef}
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
