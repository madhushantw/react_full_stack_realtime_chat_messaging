import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { ChannelList, useChatContext } from 'stream-chat-react';
// import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';
import ChannelSearch from './ChannelSearch';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview';

const cookies = new Cookies;

const SideBar = ({ logout }) => (
  <div className='h-screen p-2 bg-blue-700'>
    <div className='p-2 mb-2 bg-white rounded-full shadow-2xl'>
      <div>
        
        <img src={HospitalIcon} alt="Hospital" width="30" />
      </div>
    </div>
    <div className='p-2 mb-2 bg-white rounded-full shadow-lg shadow-black-500/50'>
      <div onClick={logout}>
        <img src={LogoutIcon} alt="LogoutIcon" width="30" />
      </div>
    </div>
  </div>
)

const CompanyHeader = () => (
  <div>
    <p className='text-lg font-bold text-white '>
      Medical Pager
    </p>
  </div>
)

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
}
const customChannelmessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({isCreating,  setisCreating,  setcreateType,  setisEditing, setToggeContainer}) => {
  const { client } = useChatContext();
  const logout = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
  }

  const filters = { members: { $in: [client.userID] } }
  
  return (
    <div className='flex'>
      <SideBar logout={logout}/>
      <div className='w-[250px] flex flex-col justify-start bg-blue-600 *:bg-blue-600 p-4 *:mb-3 *:text-white'>
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggeContainer} />
        
        <ChannelList 
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) =>(
            <TeamChannelList 
              {...listProps}
              type='team'
              isCreating={isCreating}
              setisCreating={setisCreating}
              setcreateType={setcreateType}
              setisEditing={setisEditing}
              setToggeContainer={setToggeContainer}
            />
          )}
          Preview={(previewProps)=>(
            <TeamChannelPreview 
              {...previewProps}
              type='team'
              setToggeContainer={setToggeContainer}
              isCreating={isCreating}
              setIsCreating={setisCreating}
              setcreateType={setcreateType}
              setIsEditing={setisEditing}
            />
          )}
        />      

        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelmessagingFilter}
          List={(listProps) =>(
            <TeamChannelList 
              {...listProps}
              type='messaging'
              isCreating={isCreating}
              setisCreating={setisCreating}
              setcreateType={setcreateType}
              setisEditing={setisEditing}
              setToggeContainer={setToggeContainer}
            />
          )}
          Preview={(previewProps)=>(
            <TeamChannelPreview 
              {...previewProps}
              type='messaging'
              isCreating={isCreating}
              setIsCreating={setisCreating}
              setcreateType={setcreateType}
              setIsEditing={setisEditing}
              setToggeContainer={setToggeContainer}
            />
          )}
        />        
                
      </div>
    </div>
  )
}
const ChannelListContainer = ({setisCreating,  setcreateType,  setisEditing}) => {
  const [toggeContainer, setToggeContainer] = useState(false);
  return (
    <>
      <div>
        <ChannelListContent 
          setisCreating={setisCreating}
          setcreateType={setcreateType}
          setisEditing={setisEditing}
        />
      </div>

      <div
        style={{left: toggeContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
      >
          <div onClick={()=> setToggeContainer((prevToggleContainer)=>!prevToggleContainer)}>
          <ChannelListContent 
          setisCreating={setisCreating}
          setcreateType={setcreateType}
          setisEditing={setisEditing}
          setToggeContainer={setToggeContainer}
        />
          </div>
      </div>
    </>
  )
}
export default ChannelListContainer

