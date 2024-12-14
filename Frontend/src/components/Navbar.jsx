import { MessageSquare, Settings, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-[#1a1517] border-b border-[#3a2f33]">

      <Link
        to="/"
        className="flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <MessageSquare className="h-5 w-5 text-[#d4a853]" />
        <span className="text-[#d4a853] font-medium">ChatApp</span>
      </Link>

      <div className="flex items-center">
        {authUser && (
          <>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#3a2f33] transition-colors text-[#8b8685] hover:text-[#d4a853]"
            >
              <User className="h-5 w-5" />
              <span className='hidden sm:inline'>Profile</span>
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#3a2f33] transition-colors text-[#8b8685] hover:text-[#d4a853]"
            >
              <LogOut className="h-5 w-5" />
              <span className='hidden sm:inline'>Logout</span>
            </button>
          </>)
        }
      </div>
    </nav>
  );
}
