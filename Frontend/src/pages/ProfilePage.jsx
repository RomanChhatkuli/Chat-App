import { Camera, User, Mail } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore.js'
import { useState } from 'react';

export default function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [profileImage, setProfileImage] = useState("")

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (file) {
      // cloudinary requires image to be base64Image to upload 
      const reader = new FileReader();

      // Convert the file to a Base64 string
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        const base64Image = reader.result; // This will be a Base64 string

        setProfileImage(base64Image); // Update the profile image state

        // Send the Base64 string to the backend
        await updateProfile({ profilePic: base64Image });
      };
    }
  };


  return (
    <div className="min-h-[calc(100vh-3.6rem)] bg-[#1a1517] p-6">
      <div className="max-w-md mx-auto space-y-5">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-[#d4a853]">Profile</h1>
          <p className="text-[#8b8685]">Your profile information</p>
        </div>

        <div className="flex flex-col items-center space-y-5">
          <div className="relative">
            <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 p-1 rounded-full">
              <div className="w-36 h-36 rounded-full bg-[#3a2f33] overflow-hidden">
                <img
                  src={profileImage || authUser.profilePic || "./avatar1.jpg"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full "
                />
              </div>
            </div>
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 p-2 bg-[#d4a853] rounded-full cursor-pointer hover:bg-[#c49843] transition-colors"
            >
              <Camera className="w-5 h-5 text-black" />
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-[#8b8685] text-sm mt-3">
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
          </p>
        </div>


        <form className="space-y-5">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[#8b8685]">
              <User className="w-5 h-5" />
              Full Name
            </label>
            <input
              type="text"
              disabled
              value={authUser?.fullName}
              className="w-full px-4 py-2 bg-[#3a2f33] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#d4a853]"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[#8b8685]">
              <Mail className="w-5 h-5" />
              Email Address
            </label>
            <input
              type="email"
              disabled
              value={authUser?.email}
              className="w-full px-4 py-2 bg-[#3a2f33] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#d4a853]"
            />
          </div>
        </form>

        <div className="space-y-2">
          <h2 className="text-[#d4a853] text-lg font-medium">Account Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#8b8685]">Member Since</span>
              <span className="text-white">{new Date(authUser.createdAt)?.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8b8685]">Account Status</span>
              <span className="text-emerald-400">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

