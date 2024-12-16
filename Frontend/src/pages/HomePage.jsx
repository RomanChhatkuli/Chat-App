import { useChatStore } from "../store/useChatStore.js";

import Sidebar from "../components/Sidebar.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import ChatContainer from "../components/ChatContainer.jsx";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[calc(100vh-3.6rem)] bg-[#1a1517] lg:px-8">
      <div className="flex items-center justify-center">
        <div className="bg-[#1a1517] rounded-lg shadow-cl w-full max-w-8xl h-[calc(100vh-8rem)] lg:h-[calc(100vh-4rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;