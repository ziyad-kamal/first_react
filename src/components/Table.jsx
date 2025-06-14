import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

export default function Table({ title, classes, tableHeaders = [], children,handleBtnClick}) {
    const headersList = tableHeaders.map((header,i) => {
        return (
            <th key={i} className="text-left py-3 px-3 text-sm font-medium text-gray-900">
                {header}
            </th>
        );
    });

    return (
        <>
            <div
                className={`max-w-6xl mx-auto rounded-lg shadow-sm border
                    border-gray-200 p-6 ${classes}`}
            >
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900 mb-2">
                            {title}
                        </h1>
                    </div>

                    <Button
                        classes={"bg-indigo-600 hover:bg-indigo-700"}
                        text={`Add`}
                        icon={faPlus}
                        handleClick={handleBtnClick}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                {headersList}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                                {children}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
