import React from 'react'
import { useChatStore } from '../store/useChatStore.js'
import { X } from 'lucide-react';

function ChatHeader() {
    const { selectedUser, onlineUsers, setSelectedUser } = useChatStore();
    return (
        <div className="flex items-center justify-between px-4 py-3  bg-[#1a1517] border-b border-zinc-800">
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <img
                        src={ selectedUser?.profilePic || "./avatar1.jpg"}
                        alt={selectedUser?.fullName}
                        className="w-10 h-10 rounded-full"
                    />
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full 
                    ${onlineUsers.includes(selectedUser?._id) ? 'bg-green-500' : 'bg-gray-500'} border-2 border-zinc-800`}></span>
                </div>
                <div>
                    <h2 className="text-white font-medium">{selectedUser?.fullName}</h2>
                    <p className="text-gray-400 text-sm">
                        {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                    </p>
                </div>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors"
            onClick={() => setSelectedUser(null)}
            >
                <X />
            </button>
        </div>
    );
}

export default ChatHeader
