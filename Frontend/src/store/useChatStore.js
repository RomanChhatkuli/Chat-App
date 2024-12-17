import { create } from "zustand";
import { axiosInstance } from "../lib/Axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js"

export const useChatStore = create ((set,get) => ({
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
    suscribeToMessages: () =>{
        const { selectedUser } = get();
        if(!selectedUser) return
        
        const socket = useAuthStore.getState().socket
        socket.on("newMessage",(newMessage) =>{
            if(newMessage.senderId !== selectedUser._id) return
            set({messages: [...get().messages,newMessage]})
        })
    },
    unSuscribeFromMessages: () =>{
        const socket = useAuthStore.getState().socket
        socket.off("newMessage")
    },
    setSelectedUser: (selectedUser) =>{
        set({selectedUser})
    }
}))