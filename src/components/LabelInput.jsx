export default function LabelInput({
    name,
    classes = "focus:shadow-blue-500 focus:border-blue-500 bg-white",
    type = "text",
    placeholder = "",
    label = "",
    isRequired,
    handleChange,
    inputRef,
    error = ''
}) {
    return (
        <>
            <label
                htmlFor={name}
                className="text-lg leading-none mb-3 font-semibold"
            >
                {label === "" ? name : label}
            </label>
            <input
                className={`rounded-md  border-1 border-gray-300 
                        border-solid appearance-none w-full p-1.5 text-lg 
                        leading-6 text-black bg-clip-padding ${error  ? 'mb-0.5':'mb-4'}
                        focus:outline-0 focus:shadow ${classes}
                        `}
                type={type}
                name={name}
                placeholder={placeholder}
                required={isRequired}
                id={name}
                autoComplete="true"
                ref={inputRef}
                onChange={(e)=>handleChange(e.target.value,name)} 
            />
            {error ? <p className="text-red-500 font-bold mb-1">{error}</p> : null}
        </>
    );
}
