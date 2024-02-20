import React, { useState, useEffect } from 'react';
import { getChannel, useChatContext } from 'stream-chat-react';

import SearchIcon from '../assets/SearchIcon.svg'
import ResultsDropdown from './ResultsDropdown';


const ChannelSearch = ({setToggleContainer}) => {
  const { client, setActiveChannel } = useChatContext()
  const [query, setquery] = useState('');
  const [loading, setloading] = useState(false);
  const [teamChannel, setTeamChannel] = useState([]);
  const [derectChannel, setDerectChannel] = useState([]);

  useEffect(()=>{
    setTeamChannel([])
    setDerectChannel([])
  },[query])
  const getChannels = async (text) => {
    try {
      const channelResponse = await client.queryChannels({
        type:'team', 
        name: { $autocomplete: text }, 
        members: { $in: [client.userID]}
      })
      const userResponse = await client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text }
      })

      const [channels, { users }] = await Promise.all([channelResponse, userResponse]);

      if(channels.length) setTeamChannel(channels);
      if(users.length) setDerectChannel(users);
    } catch (error) {
      setquery('');
    }
  }

  const onSearch = (event) => {
    event.preventDefault();

    setloading(true);
    setquery(event.target.value);
    getChannels(event.target.value);
  }

  const setChannel = (channel) =>{
    setquery('');
    setActiveChannel(channel);
  }
  return (
    <div>
      <div className=''>
        <div className='w-[100%]  mt-2 bg-blue-500 p-1 rounded-[10px] focus:border-2 focus:border-blue-400'>
          <div className='absolute flex p-1 *:text-[18px]'>
            <ion-icon className='justify-center m-auto align-middle' name="search-outline"></ion-icon>
          </div>
          <input 
            style={{ caretColor: 'white' }} 
            className='pl-8 text-white w-[100%] bg-transparent rounded-md  outline-none focus:shadow-gray-50'  
            type="text" 
            placeholder='Search' 
            value={query} 
            onChange={onSearch}/>
        </div>
      </div>
      { query && (
        <ResultsDropdown 
        teamChannels = {teamChannel}
          directChannels = {derectChannel}
          loading = {loading}
          setChannel = {setChannel}
          setToggleContainer = {setToggleContainer}
        />
      )}
    </div>
  )
}

export default ChannelSearch