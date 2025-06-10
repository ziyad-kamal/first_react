import Button from "../components/Button";
import Table from "../components/Table";

export default function Admins() {
    return (
        <>
            <Table
                title={"admins"}
                classes={"bg-white"}
                tableHeaders={["name", "email",'created at']}
            >
                <td className="py-4 px-0 text-sm font-medium text-gray-900">
                    Lindsay Walton
                </td>
            </Table>
        </>
    );
}
