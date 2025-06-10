export default function Button({ text, classes, type = "submit" }) {
    return (
        <>
            <button
                className={` text-sm font-bold  text-center text-white 
                    px-3 py-2 w-auto rounded-md cursor-pointer ${classes}`}
                type={type}
            >
                {text}
            </button>
        </>
    );
}
