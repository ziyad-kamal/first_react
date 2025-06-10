export default function Alert({ type, text, show }) {
    const bg = type === "success" ? "bg-green-600" : "bg-red-700";
    return (
        <>
            {show ? (
                <div className={`${bg} text-lg w-full h-auto p-3 text-center`}>
                    {text}
                </div>
            ) : null}
        </>
    );
}
