import React, { useRef } from 'react'
import { Image, Send, X } from 'lucide-react';
import { useState } from 'react';
import { useChatStore } from '../store/useChatStore.js';

function MessageInput() {
    const [text, setText] = useState('');
    const [imagePreview, setImagePreview] = useState(null)
    const { sendMessages } = useChatStore()

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                setImagePreview(reader.result)
            };
        }
    }

    const removeImage = () => {
        setImagePreview(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendMessages({ text: text.trim(), image: imagePreview });
            setText("")
            setImagePreview(null)
        } catch (error) {
            console.error("Failed to send message: ", error)
        }
    };

    return (
        <div className='w-full'>
            {imagePreview && (
                <div className='flex items-center gap-2 p-2'>
                    <div className='relative'>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className='w-20 h-20 object-cover rounded-lg border-zinc-700'
                        />

                        <button
                            onClick={removeImage}
                            className='absolute top-[-5px] left-[70px] bg-base-300 rounded-full'
                        >
                            <X className='size-4' />
                        </button>

                    </div>
                </div>
            )}



            <form
                onSubmit={handleSubmit}
                className="flex items-center space-x-3 p-2 md:space-x-5 md:p-4 bg-[#1a1517] order-t border-collapse border-t-2 border-zinc-800"
            >
                <label
                    htmlFor="messageImage"
                    className=" rounded-full cursor-pointer">
                    <Image size={20} />
                    <input
                        id='messageImage'
                        accept="image/*"
                        type="file"
                        onChange={handleImageChange}
                        className="text-gray-400 input hover:text-white transition-colors hidden"
                    />
                </label>

                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 input-sm sm:input-md bg-[#2a2436] text-white placeholder-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-600"
                />
                <button
                    type="submit"
                    className="btn btn-circle cursor-pointer"
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
}

export default MessageInput