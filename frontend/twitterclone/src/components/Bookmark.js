import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { TWEET_API_END_POINT , USER_API_END_POINT } from '../redux/utils/constant';
import { getRefresh } from '../redux/tweetSlice';
import Tweet from '../components/Tweet';
import toast from 'react-hot-toast';

const Bookmark = () => {
  const { user } = useSelector((state) => state.user);
  const [bookmarkedTweets, setBookmarkedTweets] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/bookmarks/all`, {
          withCredentials: true,
        });
        setBookmarkedTweets(res.data.tweets || []);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to load bookmarks");
      }
    };

    if (user?._id) {
      fetchBookmarks();
    }
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-4">Bookmarked Tweets</h1>
      {bookmarkedTweets.length === 0 ? (
        <p className="text-gray-400">You have no bookmarks yet.</p>
      ) : (
        bookmarkedTweets.map((tweet) => (
          <Tweet key={tweet?._id} tweet={tweet} />
        ))
      )}
    </div>
  );
};

export default Bookmark;
