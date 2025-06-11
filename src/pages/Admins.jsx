import {useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import Table from "../components/Table";
import axios from "axios";
import getData from "../functions/getData";
import { AlertContext } from "../contexts/AlertContext";

export default function Admins() {
    const {handleMessageState} = useContext(AlertContext);
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
        const cancelTokenSource = axios.CancelToken.source();

        const fetchData = async () => {
            const response = await getData(url, cancelTokenSource);
            if (response && response.success) {
                setAdmins(response.data);
            } else if (response) {
                handleMessageState(response.msg);
            }
        };

        fetchData();

        return () => cancelTokenSource.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // function handleDelete(id) {
    //     let newAdmins = admins.filter((task) => {
    //         return task.id !== id;
    //     });

    //     setAdmins(newAdmins);
    // }

    // function handleEdit(id) {
    //     let newAdmins = admins.map((task) => {
    //         if (task.id === id) {
    //             return { ...task, title: task.title + "ww" };
    //         }

    //         return task;
    //     });

    //     setAdmins(newAdmins);
    // }

    const adminsRow = admins.map((admin) => {
        return (
            <tr
                key={admin.id}
                className="hover:bg-gray-200 "
            >
                <td className="py-4 px-3 text-sm font-medium text-gray-900">
                    {admin.name}
                </td>

                <td className="py-4 px-3 text-sm font-medium text-gray-900">
                    {admin.email}
                </td>
                <td className="py-4 px-3 text-sm font-medium text-gray-900">
                    {admin.created_at}
                </td>
                <td className="py-4 px-3 text-sm font-medium text-gray-900">
                    <Button
                        classes={"bg-indigo-600 hover:bg-indigo-700"}
                        text={`Edit`}
                    />
                </td>
            </tr>
        );
    });

    return (
        <>
            <Table
                title={"admins"}
                classes={"bg-white"}
                tableHeaders={["name", "email", "created at", "action"]}
            >
                {adminsRow}
            </Table>
        </>
    );
}
