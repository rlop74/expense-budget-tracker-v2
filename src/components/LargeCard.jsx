export function LargeCard({ title, content }) {
    return (
        <div className="col-span-3 border-1 border-gray-300 rounded-3xl flex flex-col p-4 shadow-md hover:shadow-lg">
            <div className="flex justify-between">
                <div className="text-lg font-[550]">{title}</div>
                <div className="flex justify-end gap-2">
                    <p>Income</p>
                    <p>Expense</p>
                    <p>All accounts</p>
                    <p>This year</p>
                </div>
            </div>
            <div>{content}</div>
        </div>
    );
}
