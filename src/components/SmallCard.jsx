export const SmallCard = ({ title, amount }) => {
    return (
        <div className="row-span-1 flex flex-col border-2 border-gray-300 rounded-3xl gap-5 p-5 shadow-md hover:shadow-lg">
            <h2 className="text-xl">{title}</h2>
            <p className="text-3xl">{amount}</p>
            <p className="text-gray-500 text-sm">
                <span className="mr-1 p-1 rounded-xl bg-green-200 text-green-700 px-2">12.1%</span>
                vs last month
                
            </p>
        </div>
    )
}