import { create } from "zustand";
import { axiosInstance } from "../lib/Axios.js";
import toast from "react-hot-toast";

export const useChatStore = create ((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async() =>{
        set({isUsersLoading: true});
        try {
            const response = await axiosInstance.get("/messages/users")
            set({users: response.data})
        } catch (error) {
            console.log("Error in getUsers useChatStore: ",error)
            toast.error(error.response.data.messages)
        }finally{
            set({isUsersLoading: false});
        }
    },
    getMessages: async(userId) =>{
        set({isMessagesLoading: true});
        try {
            const response = await axiosInstance.get(`/messages/:${userId}`)
            set({messages: response.data})
        } catch (error) {
            console.log("Error in getUsers useChatStore: ",error)
            toast.error(error.response.data.messages)
        }finally{
            set({isMessagesLoading: false});
        }
    },
    setSelectedUser: (selectedUser) =>{
        set({selectedUser})
    }
}))