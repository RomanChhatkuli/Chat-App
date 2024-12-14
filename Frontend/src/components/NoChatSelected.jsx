import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-4 bg-[#1a1517] relative top-[-40px] sm:top-1">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl flex items-center bg-[#312409]
             justify-center animate-bounce "
            >
              <MessageSquare className="w-8 h-8 text-[#d4a853]" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-[#d4a853]">Welcome to Chatty!</h2>
        <p className=" text-[#d4a853]">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;