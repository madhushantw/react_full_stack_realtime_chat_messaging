import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signimage from '../assets/signup.jpg'

const cookies = new Cookies();

const initialState = {
    fullName:'',
    username:'',
    password:'',
    confirmPassword:'',
    phoneNumber:'',
    avatarURL:''
}
const Auth = () => {
    const [form, setform] = useState(initialState);
    const [isSignup, setisSignup] = useState(true);
    
    const handelChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }
    const switchMode = () => {
        setisSignup((prevIsSignup) => !prevIsSignup)
    }
    const handelSubmit = async (e) => {
        e.preventDefault();

        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'http://localhost:5000/auth';
        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup) {
        cookies.set('phoneNumber', phoneNumber);
        cookies.set('avatarURL', avatarURL);
        cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload()
    }
  return (
    <div className='flex flex-col flex-wrap items-center justify-center h-full gap-5 bg-blue-500 sm:flex-wrap-reverse sm:flex-row'>
        <div className='flex-1 p-5 mx-2 mt-4 bg-white rounded-md'>
            <div className='[&>p]:my-5   [&>p]:text-2xl [&>p]:font-black'>
                <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                <form className='[&>div]:flex [&>div]:flex-col [&>div>input]:border [&>div>input]:border-gray-400 [&>div>input]:rounded-md [&>div>input]:p-1  *:*:mt-1 *:mb-1' onSubmit={handelSubmit}>
                   {isSignup && (
                   <div>
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text" 
                            name="fullName" 
                            placeholder='Full Name'
                            onChange={handelChange}
                            required />
                    </div>
                    )}
                    <div>
                        <label htmlFor="Username">Username</label>
                        <input
                            type="text" 
                            name="username" 
                            placeholder='Username'
                            onChange={handelChange}
                            required />
                    </div>
                    {isSignup && (
                    <div>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="text" 
                            name="phoneNumber" 
                            placeholder='Phone Number'
                            onChange={handelChange}
                            required />
                    </div>
                    )}
                    {isSignup && (
                    <div>
                        <label htmlFor="avatarURL">Avatar URL</label>
                        <input
                            type="text" 
                            name="avatarURL" 
                            placeholder='Avatar URL'
                            onChange={handelChange}
                            required />
                    </div>
                    )}
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password" 
                            name="password" 
                            placeholder='Password'
                            onChange={handelChange}
                            required />
                    </div>
                    {isSignup && (
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password" 
                            name="confirmPassword" 
                            placeholder='Confirm Password'
                            onChange={handelChange}
                            required />
                    </div>
                    )}
                    <div>
                        <button>
                        {!isSignup ? " Sign In" : "Sign Up"}
                        </button>
                    </div>
                </form>
                <div className='mt-5 mb-5 '>
                    <p className='text-lg '>
                        {isSignup
                            ? "Already have an account?"
                            : "Dont have account?"
                        }
                        <span className='font-medium cursor-pointer' onClick={switchMode}>
                            {isSignup ? " Sign In" : " Sign Up"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div className='flex-1'>
            <img className='w-screen h-full sm:h-svh' src={signimage} />
        </div>
    </div>
  )
}

export default Auth