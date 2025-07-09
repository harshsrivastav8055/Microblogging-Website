import React, { useState, useEffect } from 'react';
import axios from "axios";
import { USER_API_END_POINT } from "../redux/utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from '../redux/userSlice';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [circles, setCircles] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const getRandomAvatar = (userId) => {
    const avatarStyles = [
      'adventurer', 'adventurer-neutral', 'avataaars', 'big-ears', 'big-ears-neutral',
      'big-smile', 'bottts', 'croodles', 'croodles-neutral', 'fun-emoji',
      'icons', 'identicon', 'initials', 'lorelei', 'lorelei-neutral',
      'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art',
      'pixel-art-neutral', 'shapes', 'thumbs'
    ];
    const randomStyle = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
    return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${userId}`;
  };

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);

  useEffect(() => {
    let interval;
    if (gameActive) {
      interval = setInterval(() => {
        const newCircle = {
          id: Date.now(),
          x: Math.random() * 250,
          y: Math.random() * 200,
          size: Math.random() * 30 + 20,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`
        };
        setCircles(prev => [...prev, newCircle]);

        setTimeout(() => {
          setCircles(prev => prev.filter(circle => circle.id !== newCircle.id));
        }, 2000);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [gameActive]);

  const startGame = () => {
    setGameActive(true);
    setGameStarted(true);
    setScore(0);
    setTimeLeft(30);
    setCircles([]);
  };

  const resetGame = () => {
    setGameActive(false);
    setGameStarted(false);
    setScore(0);
    setTimeLeft(30);
    setCircles([]);
  };

  const handleCircleClick = (circleId) => {
    setScore(score + 1);
    setCircles(prev => prev.filter(circle => circle.id !== circleId));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
          headers: { 'Content-Type': "application/json" },
          withCredentials: true
        });
        dispatch(getUser(res?.data?.user));
        if (res.data.success) {
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, { name, username, email, password }, {
          headers: { 'Content-Type': "application/json" },
          withCredentials: true
        });
        if (res.data.success) {
          setIsLogin(true);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div>
          <img className='ml-5' width={"300px"} src={getRandomAvatar(Math.random() * 10)} alt="avatar" />
        </div>
        <div>
          <div className='my-5'>
            <h1 className='font-bold text-6xl'>Happening now.</h1>
          </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold'>{isLogin ? "Login" : "Signup"}</h1>
          <form onSubmit={submitHandler} className='flex flex-col w-[55%]'>
            {!isLogin && (
              <>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
              </>
            )}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
            <button className='bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white'>{isLogin ? "Login" : "Create Account"}</button>
            <h1>{isLogin ? "Do not have an account?" : "Already have an account?"} <span onClick={loginSignupHandler} className='font-bold text-blue-600 cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></h1>
          </form>
        </div>
      </div>

      {isLogin && (
        <div className='mt-8 bg-white rounded-lg shadow-md p-6 w-80 mr-100'>
          <h3 className='text-xl font-bold text-gray-700 mb-4 text-center'>Click Game</h3>

          <div className='text-center mb-4'>
            <div className='flex justify-between text-sm text-gray-600'>
              <span>Score: {score}</span>
              <span>Time: {timeLeft}s</span>
            </div>
          </div>

          <div className='relative w-full h-48 bg-gray-100 rounded-lg border-2 border-gray-200 overflow-hidden'>
            {circles.map(circle => (
              <div
                key={circle.id}
                className='absolute rounded-full cursor-pointer hover:scale-110 transition-transform'
                style={{
                  left: `${circle.x}px`,
                  top: `${circle.y}px`,
                  width: `${circle.size}px`,
                  height: `${circle.size}px`,
                  backgroundColor: circle.color
                }}
                onClick={() => handleCircleClick(circle.id)}
              />
            ))}

            {!gameStarted && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='text-center'>
                  <p className='text-gray-500 mb-2'>Click the circles as they appear!</p>
                  <button
                    onClick={startGame}
                    className='bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors'
                  >
                    Start Game
                  </button>
                </div>
              </div>
            )}

            {gameStarted && !gameActive && timeLeft === 0 && (
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <div className='text-center text-white'>
                  <p className='mb-2'>Game Over!</p>
                  <p className='mb-4'>Final Score: {score}</p>
                  <button
                    onClick={startGame}
                    className='bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors'
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
