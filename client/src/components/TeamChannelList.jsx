import React from 'react'
import  AddChannel  from '../assets/AddChannel';

 
const TeamChannelList = ({ children, error=false, loading, type, isCreating,  setisCreating,  setcreateType,  setisEditing, setToggeContainer}) => {

  if(error){
    return type === 'team' ? (
      <div>
        <p>
          Connection error, pleas wait a moment and try again
        </p>
      </div>
    ) : null;
  }
  if(loading){
    return (
      <div>
        <p>
          {type === 'team' ? 'Channels' : 'Messages'} loading...
        </p>
      </div>
    )
  }
  return (
    <div className='flex flex-col '>
      <div className='flex items-center content-center justify-between my-3 mr-8 align-middle '>
        <p>
        {type === 'team' ? 'Channels' : 'Direct Messages'}
        </p>
        <AddChannel 
          isCreating={isCreating}
          setisCreating={setisCreating}
          setcreateType={setcreateType}
          setisEditing={setisEditing}
          setToggeContainer={setToggeContainer}
          type = {type === 'team' ? 'team' : 'messaging'}
        />
      </div>
      {children}
    </div>
  )
}

export default TeamChannelList