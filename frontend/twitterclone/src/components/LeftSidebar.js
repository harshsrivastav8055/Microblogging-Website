import React from 'react';
import { CiHome } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { Link,useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../redux/utils/constant";
import toast from "react-hot-toast"
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';

const LeftSidebar = () => {
    const {user} = useSelector(store=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            dispatch(getUser(null));
            dispatch(getOtherUsers(null));
            dispatch(getMyProfile(null));
            navigate('/login');
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-[20%] min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border-r border-gray-200 shadow-lg'>
            <div className='p-6'>
                <div className='mb-8'>
                    <div className='flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-2 hover:scale-105 transition-transform duration-300'>
                        <img className='w-6 h-6 filter invert' src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png" alt="twitter-logo" />
                    </div>
                    <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>SocialHub</h1>
                </div>
                
                <div className='space-y-2'>
                    <Link to="/" className='flex items-center px-4 py-3 hover:bg-white/70 hover:shadow-md transition-all duration-300 rounded-xl group backdrop-blur-sm border border-white/20'>
                        <div className='p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300'>
                            <CiHome size="20px" className='text-white' />
                        </div>
                        <h1 className='font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300'>Home</h1>
                    </Link>
                    
                    <div className='flex items-center px-4 py-3 hover:bg-white/70 hover:shadow-md transition-all duration-300 rounded-xl group backdrop-blur-sm border border-white/20 cursor-pointer'>
                        <div className='p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300'>
                            <CiHashtag size="20px" className='text-white' />
                        </div>
                        <h1 className='font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-300'>Explore</h1>
                    </div>
                    
                    <Link to={`/profile/${user?._id}`} className='flex items-center px-4 py-3 hover:bg-white/70 hover:shadow-md transition-all duration-300 rounded-xl group backdrop-blur-sm border border-white/20'>
                        <div className='p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300'>
                            <CiUser size="20px" className='text-white' />
                        </div>
                        <h1 className='font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-300'>Profile</h1>
                    </Link>
                    
                    <Link to={`/bookmark/all`} className='flex items-center px-4 py-3 hover:bg-white/70 hover:shadow-md transition-all duration-300 rounded-xl group backdrop-blur-sm border border-white/20'>
                        <div className='p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300'>
                            <CiBookmark size="20px" className='text-white' />
                        </div>
                        <h1 className='font-semibold text-gray-800 group-hover:text-orange-700 transition-colors duration-300'>Bookmark</h1>
                    </Link>
                    
                    <div onClick={logoutHandler} className='flex items-center px-4 py-3 hover:bg-red-50 hover:shadow-md transition-all duration-300 rounded-xl group backdrop-blur-sm border border-white/20 cursor-pointer'>
                        <div className='p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300'>
                            <AiOutlineLogout size="20px" className='text-white' />
                        </div>
                        <h1 className='font-semibold text-gray-800 group-hover:text-red-700 transition-colors duration-300'>Logout</h1>
                    </div>
                </div>
                
                <div className='mt-8'>
                    <button className='w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group'>
                        <div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        <span className='relative z-10 flex items-center justify-center space-x-2'>
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                            </svg>
                            <span>Post</span>
                        </span>
                    </button>
                </div>
                
                {/* User info card */}
                <div className='mt-8 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm'>
                    <div className='flex items-center space-x-3'>
                        <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center'>
                            <CiUser size="20px" className='text-white' />
                        </div>
                        <div>
                            <p className='font-semibold text-gray-800 text-sm'>
                                {user?.name || 'User'}
                            </p>
                            <p className='text-gray-600 text-xs'>
                                @{user?.username || 'username'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar