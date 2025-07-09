import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";
import useGetProfile from '../hooks/useGetProfile';
import axios from "axios";
import { USER_API_END_POINT } from "../redux/utils/constant";
import toast from "react-hot-toast"
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';

const Profile = () => {
    const { user, profile } = useSelector(store => store.user);
    const { id } = useParams();
    useGetProfile(id);
    const dispatch = useDispatch();

    const followAndUnfollowHandler = async () => {
        if (user.following.includes(id)) {
            // unfollow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, { id: user?._id });
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }

        } else {
            // follow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, { id: user?._id });
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        }
    }

    // Generate a random profile image URL
    const getRandomProfileImage = () => {
        const randomId = Math.floor(Math.random() * 1000) + 1;
        return `https://picsum.photos/400/400?random=${randomId}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
                <div className="flex items-center gap-6 px-6 py-4">
                    <Link to="/" className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200">
                        <IoMdArrowBack className="text-white text-xl" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-white">{profile?.name}</h1>
                        <p className="text-gray-400 text-sm">@{profile?.username}</p>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Cover Image */}
                <div className="relative mb-8">
                    <div className="h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl">
                        <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
                    </div>
                    
                    {/* Profile Picture */}
                    <div className="absolute -bottom-16 left-8">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-gray-900 overflow-hidden shadow-xl">
                                <img 
                                    src={getRandomProfileImage()} 
                                    alt={profile?.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                        </div>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="mt-20 px-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">{profile?.name}</h2>
                            <p className="text-gray-400 text-lg">@{profile?.username}</p>
                        </div>
                        
                        {/* Action Button */}
                        <div>
                            {profile?._id === user?._id ? (
                                <button className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-semibold rounded-full border border-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                                    Edit Profile
                                </button>
                            ) : (
                                <button 
                                    onClick={followAndUnfollowHandler}
                                    className={`px-6 py-2 font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl ${
                                        user.following.includes(id) 
                                            ? "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white" 
                                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                                    }`}
                                >
                                    {user.following.includes(id) ? "Following" : "Follow"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="mb-8">
                        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                            🌐 Exploring the web's endless possibilities with MERN Stack 🚀 | Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me on this coding journey!
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 mb-8">
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-4 border border-gray-700">
                                <p className="text-2xl font-bold text-white">{user.following.length}</p>
                                <p className="text-gray-400 text-sm">Following</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4 border border-gray-700">
                                <p className="text-2xl font-bold text-white">{user.followers.length}</p>
                                <p className="text-gray-400 text-sm">Followers</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info Cards */}
                    
                </div>
            </div>
        </div>
    );
}

export default Profile;