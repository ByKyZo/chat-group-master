import React, { useContext, useEffect, useRef, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch , faChevronDown , faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FaTwitter } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';
import { UserContext } from '../../../context/UserContext';
import { useCookies } from 'react-cookie';

const ChatNav = (props) => {

    const {user} = useContext(UserContext);
    const [openProfileModal , setOpenProfileModal] = useState(false)
    const profileModalRef = useRef();
    const [cookie , setCookie , removeCookie] = useCookies();

    // console.log(profileModalRef);

    useEffect(() => {
        const isOpen = openProfileModal;
        const focusModal = (e) => {
            if (!profileModalRef.current.contains(e.target) && isOpen) setOpenProfileModal(false)
        }

        window.addEventListener('click',focusModal)
        return () => {
            window.removeEventListener('click',focusModal)
        }
    },[openProfileModal])

     return (
         <div className='w-72 bg-black-900 flex flex-col justify-between'>

            <div>
    
                <div className='border-b-2 h-16 border-gray-900 text-gray-100 font-bold text-lg px-6 flex items-center'>Channel</div>

                <div className="p-4">

                    <div className='p-2 h-14  mb-3 relative'>
                        <label htmlFor='search' className='absolute text-white top-4 left-4 cursor-pointer'><FontAwesomeIcon icon={faSearch}/></label>
                        <input id='search' type='search' autoComplete='off' 
                            className='focus:outline-none h-full w-full rounded-md p-1 pb-2  pl-10 inputSearch leading-10 ctmFocus' placeholder='Search'/>
                    </div>

                    <button className='flex items-center mb-4 cursor-pointer w-full ctmFocus hoverMenuProfileBg p-2 rounded-lg'>
                        <div className='w-8 h-8 channelIcon mr-3 rounded-md flex items-center justify-center text-white'>F</div>
                        <span className='text-gray-300'>FRONT END CHANNEL</span>
                    </button>

                    <button className='flex items-center mb-4 cursor-pointer w-full ctmFocus hoverMenuProfileBg p-2 rounded-lg'>
                        <div className='w-8 h-8 channelIcon mr-3 rounded-md flex items-center justify-center text-white'>F</div>
                        <span className='text-gray-300'>FRONT END CHANNEL</span>
                    </button>
                </div>

            </div>

            <div>

                <div className="h-14 bg-gray-700 flex">
                    <button className='px-6 w-full text-gray-300 ctmFocus hover:bg-gray-800'>CHANNEL</button>
                    <button className='px-6 w-full text-gray-300 ctmFocus hover:bg-gray-800'>MESSAGE</button>
                </div>

                <a href='' className="h-20 bg-black-1100 p-6 flex items-center justify-between w-full ctmFocus ring-inset relative" onClick={e => {
                    e.preventDefault()
                    setOpenProfileModal(true)}}>
                    <div ref={profileModalRef}
                        className={`w-48 h-44 bg-black-700 absolute -top-36 right-4 rounded-xl p-3 transition duration-200 opacity-0 transform ${openProfileModal ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                        <ul className='flex flex-col justify-evenly h-full text-left text-white'>
                            <li>
                                <button className='flex w-full transition duration-200 hoverMenuProfileBg rounded-lg p-2 items-center ctmFocus'>
                                    <FontAwesomeIcon className='text-xl mr-3' icon={faUserCircle}/> 
                                    My Profile   
                                </button>
                            </li>
                            <li>
                                <button className='flex w-full transition duration-200 hoverMenuProfileBg rounded-lg p-2 items-center ctmFocus'>
                                    <FaTwitter className='text-xl mr-3' />
                                    Tweeter
                                </button>
                            </li>
                            <li className='h-1 border-b border-gray-100 my-2 opacity-30'></li>
                            <li>
                                <button 
                                    className='flex w-full text-red-500 transition duration-200 hoverMenuProfileBg rounded-lg p-2 items-center ctmFocus' 
                                    onClick={() => {
                                        removeCookie(['REMEMBER_ME'])
                                        window.location.reload()
                                    }}>
                                    <IoMdExit className='text-xl mr-3' /> 
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center">
                        <img className='h-10 w-10 mr-5' src={user.image} alt='profile'></img>
                        <span className='text-gray-300 text-xl'>{user.name}</span>
                    </div>
                    <FontAwesomeIcon className='text-gray-300' icon={faChevronDown}/>
                </a>

            </div>

         </div>
     )

}

export default ChatNav;