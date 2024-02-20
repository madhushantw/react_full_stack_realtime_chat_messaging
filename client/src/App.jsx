import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import ChannelListContainer from './components/ChannelListContainer';
import ChannelContainer from './components/ChannelContainer'
import Auth from './components/Auth';

import 'stream-chat-react/dist/css/index.css';

const cookies = new Cookies();

const apiKey = '76k29secgz7z';
const authToken = cookies.get('token');

const client = StreamChat.getInstance(apiKey);

if(authToken){
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}

function App() {
  const [createType, setcreateType] = useState('');
  const [isCreating, setisCreating] = useState(false);
  const [isEditing, setisEditing] = useState(false);

  if(!authToken) return <Auth />
  return (
    <div className='flex w-screen '>
      <Chat client={client} theme="team light">
        <div className='flex w-screen'>
          <div className='flex-none '>
            <ChannelListContainer 
            isCreating={isCreating}
            setisCreating={setisCreating}
            setcreateType={setcreateType}
            setisEditing={setisEditing}
            />
          </div>
          <div className='flex-1'>
            <ChannelContainer 
            isCreating={isCreating}
            setIsCreating={setisCreating}
            isEditing={isEditing}
            setisEditing={setisEditing}
            createType={createType}
            />
          </div>
          
        </div>
        
      </Chat>
    </div>
  )
}

export default App
