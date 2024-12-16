import { create } from "zustand";
import { axiosInstance } from "../lib/Axios.js";
import toast from "react-hot-toast";

export const useChatStore = create ((set,get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    onlineUsers: ['675d8c75f08149a4e9758bf9'],

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
            const response = await axiosInstance.get(`/messages/${userId}`)
            set({messages: response.data})
        } catch (error) {
            console.log("Error in getUsers useChatStore: ",error)
            toast.error(error.response.data.messages)
        }finally{
            set({isMessagesLoading: false});    
        }
    },
    sendMessages: async(messageData)=>{
        const {selectedUser, messages} = get()
        try {
            const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData)
            set({messages: [...messages,response.data]})
        } catch (error) {
            console.log("Error in sendMessages useChatStore: ",error)
            toast.error(error.response.data.messages)
        }finally{

        }
    },
    setSelectedUser: (selectedUser) =>{
        set({selectedUser})
    }
}))