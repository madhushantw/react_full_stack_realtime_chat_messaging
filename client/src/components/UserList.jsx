import React, { useEffect, useState } from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'
import InviteIcon from '../assets/InviteIcon'

const ListContainer = ({children}) => {
  return (
    <div className=''>
      <div className='flex justify-between my-5 *:text-lg *:text-slate-500'>
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  )
}

const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false);

  const handelclick = () => {
    if(selected) {
      setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id));
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id])
    }

    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <div className='flex items-center justify-between my-2' onClick={handelclick}>
      <div className='flex items-center'>
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p>{user.fullName || user.id}</p>
      </div>
      {selected ? <InviteIcon/> : <ion-icon name="ellipse-outline"></ion-icon>}

    </div>
  )
}

const UserList = ({ setSelectedUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(()=>{
    const getUser = async () => {
      if(loading) return;

      setLoading(true);
      try {
        const response = await client.queryUsers(
          { id:{$ne: client.userID}},
          { id: 1 },
          { limit: 8}
        );
        if(response.users.length){
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
         
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    }

    if(client) getUser();
  }, [])

  if(error) {
    return (
      <ListContainer>
        <div>
          Error loading, please refrese and try again.
        </div>
      </ListContainer>
    )
  }
  if(listEmpty) {
    return (
      <ListContainer>
        <div>
          No users found.
        </div>
      </ListContainer>
    )
  }

  return (
    <ListContainer>
      {loading ? <div>
        Loading users ...
      </div> :(
        users.map((user, i) => (
          <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
        ))
      )}
    </ListContainer>
  )
}

export default UserList