import React from 'react'

const AddChannel = ({ setcreateType, setisCreating, setisEditing, setToggleContainer, type }) => {
    const onClick = () => {
      setcreateType(type);
      setisCreating((prevState) => !prevState);
      setisEditing(false);
      if(setToggleContainer) setToggleContainer((prevState) => !prevState) 
    }
  return (
    <div onClick={onClick} className=' align-middle'>
      <ion-icon name="add-circle"></ion-icon>
    </div>
  )
}

export default AddChannel