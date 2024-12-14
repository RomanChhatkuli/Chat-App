import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import SidebarSkeleton from './skeletons/SidebarSkeleton.jsx';

function Sidebar() {
    const { getUsers,users,selectedUser,setSelectedUser, isUsersLoading} = useChatStore();
    const onlineUsers = []

    useEffect(() => {
        const fetchUsers = async() =>{
            await getUsers();
        }
        fetchUsers()
    },[])

    if(true) return <div className='text-[#d4a853]'> <SidebarSkeleton/> </div>

   return (
    <div className='text-[#d4a853]'>
        Sidebar
    </div>
  )
}

export default Sidebar