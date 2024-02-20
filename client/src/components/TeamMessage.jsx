import React from 'react'
import { useMessageContext } from 'stream-chat-react';

const TeamMessage = (messageProps) => {
  const { handleOpenThread, message } = useMessageContext();

    return (
        <div>
          {message.text}
        </div>
    )
}

export default TeamMessage