import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import SidebarSkeleton from './skeletons/SidebarSkeleton.jsx';
import { User, Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore.js';

function Sidebar() {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [showOnline,setShowOnline] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            await getUsers();
        }
        fetchUsers()
    }, [])

    const filteredUser = showOnline ? users.filter((user) => onlineUsers.includes(user._id)) : users

    if (isUsersLoading) return <div className='text-[#d4a853]'> <SidebarSkeleton /> </div>

    return (
        <aside className='text-[#d4a853]'>
            <div className="w-21 md:w-72 bg-[#1a1517] flex flex-col border-r border-zinc-800 h-screen">
                {/* Header Section */}
                <div className="p-4 border-b border-zinc-800">
                    <div className='flex items-center gap-2'>
                        <Users className='size-6' />
                        <span className="text-lg font-semibold hidden lg:block">Contacts</span>
                    </div>

                    {/* TODO  */}
                    <div className='hidden lg:block'>
                        <label className="flex items-center gap-2 text-sm mt-2 ">
                            <input
                                type="checkbox"
                                onChange={(e) => setShowOnline(e.target.checked)}
                                className="checkbox checkbox-sm checkbox-warning"
                            />
                            Show online only <span className='text-zinc-700'>({onlineUsers.length-1} online)</span>
                        </label>
                    </div>
                </div>

                {/* Scrollable Contact List */}
                <div className="flex-1 overflow-y-auto">
                    <div className="md:p-2">
                        {filteredUser.map((user) => (
                            <button
                                key={user._id}
                                onClick={() => setSelectedUser(user)}
                                className={`flex items-center md:mb-1 relative gap-3 w-full p-2 rounded-lg hover:bg-[#392c10]
                                 transition-colors ${selectedUser?._id === user._id ? "bg-base-100" : ""}`}
                            >
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800">
                                    <img
                                        src={user.profilePic || "./avatar1.jpg"}
                                        alt={user.fullName}
                                        className="w-full h-full object-cover"
                                    />
                                    {onlineUsers.includes(user._id) && (
                                        <span className='absolute size-3 bg-green-500 top-2 left-10 rounded-full' />
                                    )}
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-sm hidden lg:block font-medium">{user.fullName}</span>
                                    <span className="text-xs hidden lg:block text-zinc-500">{onlineUsers.includes(user._id)? "Online" : "Offline"}</span>
                                </div>
                            </button>
                        ))}
                        {filteredUser.length == 0 && (
                            <div className='text-center mt-9 text-zinc-500'>
                                No Online Users
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>

    )
}

export default Sidebar