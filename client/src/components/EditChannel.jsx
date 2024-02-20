import React, { useState } from 'react'
import userList from './UserList';
import { useChatContext } from 'stream-chat-react';
import UserList from './UserList';

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



const EditChannel = ({ setIsEditing }) => {
   const{ channel } = useChatContext();
   const [channelName, setChannelName] = useState(channel?.data?.name)
   const [selectedUsers, setSelectedUsers] = useState([]);

   const updateChangele =  async (event) => {
    event.preventDefault();
  
    const nameChanged = channelName !== (channel.data.name || channel.data.id);

    if(nameChanged) {
      await channel.update({ name: channelName }, { text: `Channel name changed to ${channelName}`});
    }

    if(selectedUsers.length){
      await channel.addMembers(selectedUsers);
    }

    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([]);
  }
    return (
    <div className='p-8'>
      <div>
        <p>Edit Channerl</p>
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
      <UserList setSelectedUsers={setSelectedUsers} />
      <div onClick={updateChangele} className='absolute px-8 py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 bottom-6 right-6'>
        <p>Save Change</p>
      </div>
    </div>
  )
}

export default EditChannel