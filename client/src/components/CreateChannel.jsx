import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'
import  CloseCreateChannel  from '../assets/CloseCreateChannel'
import UserList from './UserList'

const ChannelNameInput = ({channelName, setChannelName}) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
  const handleChane = (event) => {
    event.preventDefault()
    setChannelName(event.target.value)
  }
  return(
    <div className='flex flex-col gap-3 '>
      <p>Name</p>
      <input className='px-2 border rounded-md border-sky-600' type="text" onChange={handleChane} value={channelName} placeholder='Channel-Name (no spaces)' />
      <p>Add Memder</p>
    </div>
  )
}

const CreateChannel = ({createType, setIsCreating}) => {
  const [channelName, setChannelName] = useState('');
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
  
  const createChanel = async (e) =>{
    e.preventDefault();
    try {
      const newChannel = await client.channel(createType, channelName, {
        name:channelName, members:selectedUsers
      })
      await newChannel.watch();

      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='flex flex-col w-full p-5 '>
      <div className='flex justify-between pb-3 border-b '>
        <p className='text-lg font-bold '>{createType === 'team' ? 'Crearte a New Channel' : 'Send a Derect Message'}</p>
        <CloseCreateChannel setIsCreating={setIsCreating}/>
      </div>
      {createType === 'team' &&  <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
      <UserList setSelectedUsers={setSelectedUsers}/>
      <div onClick={createChanel} className='flex cursor-pointer w-[220px] items-center rounded-md bg-blue-700 absolute bottom-7 right-7'>
        <p className='p-2 m-auto text-lg font-semibold text-white'>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
      </div>
    </div>
  )
}

export default CreateChannel