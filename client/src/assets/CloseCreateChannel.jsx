import React from 'react'

const CloseCreateChannel = ({ setIsCreating, setIsEditing }) => {
  const onClick=() => {
    if (setIsCreating) {setIsCreating(false);}
    if (setIsEditing) {setIsEditing(false);}
  }
  return (
    <div onClick={onClick} className=' flex items-center text-blue-700 text-2xl'>
      <ion-icon  name="close-circle"></ion-icon>
    </div>
  )
}

export default CloseCreateChannel
