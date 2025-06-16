import Button from "./Button";

export default function Modal({
    title,
    content,
    open,
    handleClick,
    handleClose,
    btnText,
    btnClasses,
    btnType,
}) {
    return (
        <div
            onClick={handleClose}
            id="modalOverlay"
            className={`${
                open ? "flex" : "hidden"
            } modal-overlay fixed inset-0 bg-semi-trans  items-center justify-center p-4 z-3000`}
        >
            <div
                id="modalContent"
                className="modal-content bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-200"
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    <button
                        onClick={handleClose}
                        id="closeModal"
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="p-6">{content}</div>
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                    <Button
                        text={"cancel"}
                        type="button"
                        classes="bg-gray-400 hover:bg-gray-500"
                        handleClick={handleClose}
                    />
                    <Button
                        text={btnText}
                        type={btnType}
                        classes={btnClasses}
                        handleClick={handleClick}
                    />
                </div>
            </div>
        </div>
    );
}
