import React, { useEffect, useState } from 'react';
import { API_URL } from './config';
import Authentication from './containers/Authentication/Authentication';
import ChatApp from './containers/ChatApp/ChatApp';
import { UserContext } from './context/UserContext';
import { useCookies } from 'react-cookie';
import noProfilImg from './assets/images/no-profile-picture.svg';
import axios from 'axios';

const userDisconnected = {
    id : null,
    name : null,
    email : null,
    description : null,
    image : null,
    role : null,
    isConnected : false
}

const App = (props) => {

    const [user , setUser] = useState(userDisconnected)

    const [cookie , setCookie] = useCookies()

    useEffect(() => {

        axios.get(`${API_URL}post/user/rememberme`,{withCredentials : true})
            .then(res => {
                console.log(res)
                if (res.data === '') throw new Error();
                setUser({
                    id : res.data.id,
                    name : res.data.name,
                    email : res.data.email,
                    description : res.data.description,
                    image : res.data.image ? res.data.image : noProfilImg,
                    role : null,
                    isConnected : true // pas besoin de ça
                })
                // A VOIR POUR FAIRE DE L'ASYNC
                setCookie(['REMEMBER_ME'],res.data.token)
            })
            .catch(err => {
                setUser(userDisconnected);
            })
    
    },[])

    return (
        <div className='h-screen flex justify-center items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-10'>

            <UserContext.Provider value={{user , setUser}} >


                { !user.isConnected ? 
                
                    <Authentication />
                    
                    :

                    <ChatApp />

                }

            </UserContext.Provider>

        </div>
    )

}

export default App;