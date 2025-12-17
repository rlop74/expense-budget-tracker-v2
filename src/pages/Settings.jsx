// src/pages/Settings.jsx
import { useUserStore } from "../stores/user-store";

export const Settings = () => {
    const user = useUserStore((state) => state.user);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <div className="space-y-8">
                {/* Profile */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-xl font-semibold mb-6">Profile</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <p className="text-lg">
                                {user?.first_name} {user?.last_name}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <p className="text-lg">{user?.email}</p>
                        </div>
                        <button className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:!bg-violet-700">
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-xl font-semibold mb-6">Preferences</h2>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Dark Mode</p>
                                <p className="text-sm text-gray-500">
                                    Coming soon
                                </p>
                            </div>
                            <div className="w-12 h-6 bg-gray-300 rounded-full" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">
                                    Email Notifications
                                </p>
                                <p className="text-sm text-gray-500">
                                    Weekly summary
                                </p>
                            </div>
                            <div className="w-12 h-6 bg-violet-600 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-200">
                    <h2 className="text-xl font-semibold mb-6 text-red-600">
                        Danger Zone
                    </h2>
                    <button className="bg-red-600 text-white px-6 p-3 rounded-lg hover:!bg-red-700">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};
