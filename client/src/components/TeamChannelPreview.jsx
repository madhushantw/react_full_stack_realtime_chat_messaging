import React from 'react'
import { Avatar, Channel, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type}) => {
  const { channel: activeChannel, client } = useChatContext();
  const Channelpreview = () => (
    <p>
      # {channel?.data?.name || channel?.data?.id}
    </p>
  )
  const DirectPreviev = () => {
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    return (
      <div className='flex '>
        <Avatar 
          image={members[0]?.user.image}
          name={members[0]?.user.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user.fullName || members[0]?.user?.id}</p>
      </div>
    )
  }
  return (
    <div className={channel?.id === activeChannel?.id ? ' p-3 rounded-md bg-blue-500': 'p-3 rounded-md0'}
    onClick={() =>{
      setIsCreating(false)
      setIsEditing(false)
      setActiveChannel(channel)
      if(setToggleContainer){
        setToggleContainer((prevstate) =>!prevstate)
      }
    }}
    >
      {type === 'team' ? <Channelpreview /> : <DirectPreviev />}
    </div>
  )
}

export default TeamChannelPreview