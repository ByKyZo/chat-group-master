import React from 'react';
import ChatNav from './ChatNav/ChatNav';

const ChatApp = (props) => {

     return (
         <div className='w-full h-full bg-black-700 rounded-lg shadow-2xl flex overflow-hidden'>

            <ChatNav />

            {/* <ChannelMode />
            <MessageMode /> */}
            <h1>ChatApp</h1>

         </div>
     )

}

export default ChatApp;