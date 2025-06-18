
function Card({children,title,classes ='bg-blue-900 w-auto'}) {
    console.log('card')
    return (
        <>
            <div className={`h-auto text-white rounded-md ${classes}`}>
                <div className="text-3xl border-b-1 border-b-gray-800 p-4 ">
                    {title}
                </div>
                <div className="p-4 ">
                    {children}
                </div>
            </div>
        </>
    );
}
export default Card;