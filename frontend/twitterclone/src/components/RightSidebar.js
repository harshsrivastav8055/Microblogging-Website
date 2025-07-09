import React from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from 'react-router-dom';

const RightSidebar = ({ otherUsers }) => {
  // Random avatar generator function
  const getRandomAvatar = (userId) => {
    const avatarStyles = [
      'adventurer',
      'adventurer-neutral',
      'avataaars',
      'big-ears',
      'big-ears-neutral',
      'big-smile',
      'bottts',
      'croodles',
      'croodles-neutral',
      'fun-emoji',
      'icons',
      'identicon',
      'initials',
      'lorelei',
      'lorelei-neutral',
      'micah',
      'miniavs',
      'open-peeps',
      'personas',
      'pixel-art',
      'pixel-art-neutral',
      'shapes',
      'thumbs'
    ];
    
    const randomStyle = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
    return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${userId}`;
  };

  return (
    <div className='w-[25%] space-y-6'>
      {/* Enhanced Search Bar */}
      <div className='relative'>
        <div className='flex items-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm hover:shadow-md transition-all duration-300 group'>
          <div className='p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300'>
            <CiSearch size="18px" className='text-white' />
          </div>
          <input 
            type="text" 
            className='bg-transparent outline-none flex-1 text-gray-800 placeholder-gray-500 font-medium' 
            placeholder='Search users...' 
          />
        </div>
        <div className='absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10'></div>
      </div>

      {/* Enhanced Who to Follow Section */}
      <div className='bg-white/50 backdrop-blur-sm rounded-3xl border border-white/30 shadow-lg overflow-hidden'>
        <div className='p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-b border-white/20'>
          <h1 className='font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            Who to follow
          </h1>
        </div>
        
        <div className='p-4 space-y-4'>
          {otherUsers?.map((user, index) => {
            const gradients = [
              'from-blue-500 to-purple-500',
              'from-purple-500 to-pink-500',
              'from-pink-500 to-red-500',
              'from-red-500 to-orange-500',
              'from-orange-500 to-yellow-500',
              'from-yellow-500 to-green-500',
              'from-green-500 to-emerald-500',
              'from-emerald-500 to-teal-500',
              'from-teal-500 to-cyan-500',
              'from-cyan-500 to-blue-500'
            ];
            
            const buttonGradient = gradients[index % gradients.length];
            
            return (
              <div key={user?._id} className='flex items-center justify-between p-3 hover:bg-white/30 rounded-2xl transition-all duration-300 group border border-transparent hover:border-white/20'>
                <div className='flex items-center space-x-3'>
                  <div className='relative'>
                    <div className='w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/50 group-hover:ring-white/80 transition-all duration-300'>
                      <Avatar 
                        src={getRandomAvatar(user?._id)} 
                        size="48" 
                        round={true} 
                        className='hover:scale-110 transition-transform duration-300'
                      />
                    </div>
                    <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white'></div>
                  </div>
                  <div>
                    <h1 className='font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300'>
                      {user?.name}
                    </h1>
                    <p className='text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300'>
                      @{user?.username}
                    </p>
                  </div>
                </div>
                <div>
                  <Link to={`/profile/${user?._id}`}>
                    <button className={`px-4 py-2 bg-gradient-to-r ${buttonGradient} text-white rounded-full font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm`}>
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Show more button */}
        <div className='p-4 border-t border-white/20'>
          <button className='w-full py-3 text-center font-medium text-gray-600 hover:text-gray-800 hover:bg-white/30 rounded-2xl transition-all duration-300'>
            Show more
          </button>
        </div>
      </div>

      {/* Trending Section */}
      <div className='bg-white/50 backdrop-blur-sm rounded-3xl border border-white/30 shadow-lg overflow-hidden'>
        <div className='p-6 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border-b border-white/20'>
          <h1 className='font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
            Trending
          </h1>
        </div>
        
        <div className='p-4 space-y-3'>
          {['#SocialHub', '#WebDev', '#React', '#TechNews', '#Innovation'].map((tag, index) => (
            <div key={index} className='p-3 hover:bg-white/30 rounded-xl transition-all duration-300 cursor-pointer group'>
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full'></div>
                <span className='font-medium text-gray-800 group-hover:text-gray-900 transition-colors duration-300'>
                  {tag}
                </span>
              </div>
              <p className='text-sm text-gray-600 ml-4 mt-1'>
                {Math.floor(Math.random() * 50) + 10}k posts
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RightSidebar