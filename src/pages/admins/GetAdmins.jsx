import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { AlertContext } from "../../contexts/AlertContext";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { ModalContext } from "../../contexts/ModalContext";
import sendRequest from "../../functions/sendRequest";
import { useDispatch, useSelector } from "react-redux";
import { incrementByAmount } from "../../features/Counter";
import { asyncTest } from "../../features/AsyncTest";

export default function GetAdmins() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleMessageState } = useContext(AlertContext);
    const { handleModalState } = useContext(ModalContext);
    const [admins, setAdmins] = useState([
        {
            id: "",
            name: "",
            email: "",
            created_at: "",
        },
    ]);

    useEffect(() => {
        const url = "/admins/get";
        const abortController = new AbortController();

        dispatch(asyncTest())

        const fetchData = async () => {
            const response = await sendRequest(
                "get",
                url,
                "",
                abortController,
                navigate
            );
            if (response && response.success) {
                setAdmins(response.data.data);
            } else if (response) {
                handleMessageState(response.msg);
            }
        };

        fetchData();

        return () => abortController.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = (id) => {
        navigate(`/admins/edit/${id}`);
    };

    const handleAdd = () => {
        navigate(`/admins/add`);
    };

    const handleConfirm = (id) => {
        const url = `/admins/delete/${id}`;
        const abortController = new AbortController();

        dispatch(incrementByAmount({test:5}))

        const deleteData = async () => {
            const response = await sendRequest(
                "delete",
                url,
                "",
                abortController
            );
            if (response && response.success) {
                let newAdmins = admins.filter((admin) => {
                    return admin.id !== id;
                });

                setAdmins(newAdmins);
                handleMessageState(response.msg);
            } else if (response) {
                handleMessageState(response.msg);
            }
        };

        deleteData();
    };

    const handleDelete = (id) => {
        const content = "Are you want to delete this record?";
        handleModalState({
            open: true,
            content: content,
            title: "Delete",
            btnText: "confirm",
            btnClasses: "bg-red-600 hover:bg-red-700",
            btnType: "button",
            handleClick: () => handleConfirm(id),
        });
    };

    const adminsRow = admins.map((admin) => {
        return (
            <tr
                key={admin.id}
                className="hover:bg-gray-200 "
            >
                <td className="row_table">{admin.name}</td>

                <td className="row_table">{admin.email}</td>
                <td className="row_table">{admin.created_at}</td>
                <td className="row_table">
                    <Button
                        classes={"bg-indigo-600 hover:bg-indigo-700"}
                        text={`Edit`}
                        type="button"
                        icon={faEdit}
                        handleClick={() => handleEdit(admin.id)}
                    />
                    <Button
                        classes={"bg-red-600 hover:bg-red-700"}
                        text={`delete`}
                        type="button"
                        icon={faTrash}
                        handleClick={() => handleDelete(admin.id)}
                    />
                </td>
            </tr>
        );
    });

    return (
        <>
        <h3>{count}</h3>
            <Table
                title={"admins"}
                classes={"bg-white"}
                tableHeaders={["name", "email", "created at", "action"]}
                handleBtnClick={() => handleAdd()}
            >
                {adminsRow}
            </Table>
        </>
    );
}
