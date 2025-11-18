export const SmallCard = ({ title, amount }) => {
    return (
        <div className="flex flex-col border-1 border-gray-300 rounded-3xl gap-5 p-5 shadow-md hover:shadow-lg">
            <h2 className="text-xl">{title}</h2>
            <p className="text-3xl">{amount}</p>
            <p className="text-gray-500 text-sm">
                <span className="mr-4 p-1 rounded-xl bg-green-200 text-green-700">12.1%</span>
                vs last month
                
            </p>
        </div>
    )
}