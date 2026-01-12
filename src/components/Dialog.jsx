export const Dialog = ({
    title,
    setIsOpen,
    handleFunction,
    children,
}) => {
    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                onClick={() => setIsOpen(false)} // Close when clicking outside
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden 
                   transform transition-all duration-300 ease-out 
                   scale-100 opacity-100"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 capitalize">
                            {title}
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg hover:!bg-gray-100 transition-colors"
                            aria-label="Close edit modal"
                        >
                            <svg
                                className="w-6 h-6 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Body - Form */}
                    {children}

                    {/* Footer - Actions */}
                    <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-6 py-3 text-gray-700 font-medium rounded-xl hover:!bg-gray-200 hover:!text-gray-700 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleFunction}
                            className="px-6 py-3 bg-violet-600 text-white font-medium rounded-xl hover:!bg-violet-700 shadow-md transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
