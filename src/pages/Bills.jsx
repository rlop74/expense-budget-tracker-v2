export const Bills = () => {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Monthly Bills</h1>
                <button className="bg-violet-600 text-white px-6 py-3 rounded-lg">
                    + Add Bill
                </button>
            </div>

            <div className="bg-white rounded-xl shadow">
                <div className="p-6 border-b bg-gray-50">
                    <p className="text-gray-600">Total monthly bills</p>
                    <p className="text-3xl font-bold mt-2">$2,450.00</p>
                </div>

                <div className="divide-y">
                    {/* Bill row */}
                    <div className="p-6 flex justify-between items-center hover:bg-gray-50">
                        <div>
                            <p className="font-semibold">Rent</p>
                            <p className="text-sm text-gray-500">
                                Due on the 1st
                            </p>
                        </div>
                        <p className="text-2xl font-medium">$1,800.00</p>
                    </div>

                    {/* More rows */}
                </div>
            </div>
        </div>
    );
};
