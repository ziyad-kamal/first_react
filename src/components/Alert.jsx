export default function Alert({ type, text, show }) {
    const bg = type === "success" ? "bg-green-600" : "bg-red-700";
    return (
        <>
            {show ? (
                <div className={`${bg} text-white text-lg w-full h-auto p-3 mb-3 text-center`}>
                    {text}
                </div>
            ) : null}
        </>
    );
}
