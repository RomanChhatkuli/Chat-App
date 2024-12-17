import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import MessageSkeleton from "../components/skeletons/MessageSkeleton.jsx"
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import { useAuthStore } from '../store/useAuthStore.js';
import { getTime } from '../lib/time.js';

function ChatContainer() {
  const { isMessageLoading, messages, selectedUser, getMessages, suscribeToMessages, unSuscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore()
  const scrollChat = useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id);
    suscribeToMessages();
    return () => unSuscribeFromMessages();
  }, [selectedUser._id, getMessages, suscribeToMessages, unSuscribeFromMessages]);

  useEffect(() => {
    if(scrollChat.current && messages){
      scrollChat.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
      })  
    }
  }, [messages]);

  if (isMessageLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto text-white '>
      <ChatHeader />

      <div className='flex-1 overflow-y-auto p-4 space-y-4 '>
        {messages.map((message) => {
          return authUser._id === message.senderId ? (
            <div className="chat chat-start" key={message._id} ref={scrollChat}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt={authUser?.fullName}
                    src={authUser?.profilePic || "./avatar1.jpg"} />
                </div>
              </div>
              <time className='text-xs opacity-50 ml-1 mb-1' >{getTime(message.createdAt)}</time>
              <div className='chat-bubble flex flex-col'>
                {message.image && (<div className="sm:max-w-[200px] rounded-md mb-2"><img src={message.image} alt={selectedUser?.fullName} /></div>)}
                {message.text && (<div>{message.text}</div>)}
              </div>
            </div>
          ) : (
            <div className="chat chat-end" key={message._id} ref={scrollChat}>
              <time className='text-xs opacity-50 ml-1 mb-1' >{getTime(message.createdAt)}</time>
              <div className='chat-bubble flex flex-col'>
                {message.image && (<div className="sm:max-w-[200px] rounded-md mb-2"><img src={message.image} alt={selectedUser?.fullName} /></div>)}
                {message.text && (<div>{message.text}</div>)}
              </div>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt={selectedUser.fullName}
                    src={selectedUser?.profilePic || "./avatar1.jpg"} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer