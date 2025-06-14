import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from 'react'

function Button({
    handleClick,
    text,
    classes = "bg-green-700  hover:bg-green-800",
    type = "submit",
    icon = "",
}) {
    return (
        <>
            <button
                className={` text-sm font-bold  text-center text-white mx-1
                    px-3 py-2 w-auto rounded-md cursor-pointer ${classes}`}
                type={type}
                onClick={handleClick}
            >
                {icon != "" ? (
                    <FontAwesomeIcon
                        className="text-white mx-1"
                        icon={icon}
                    />
                ) : null}

                {text}
            </button>
        </>
    );
}

export default memo(Button) ;


