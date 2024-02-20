import React from 'react';
import { Channel,  } from 'stream-chat-react';

import ChannelInner from './Channelinner';
import CreateChannel from './CreateChannel';
import EditChannel from './EditChannel';
import TeamMessage from './TeamMessage';



const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setisEditing, createType }) => {
    if(isCreating) {
        return (
            <div className="w-full ">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    if(isEditing) {
        return (
            <div className="w-full ">
                <EditChannel setIsEditing={setisEditing} />
            </div> 
        )
    }

    const EmptyState = () => (
        <div className="channel-empty__container">
            <p className="channel-empty__first">This is the beginning of your chat history.</p>
            <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
        </div>
    )

    return (
        <div className="w-full ">
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <TeamMessage key={i} {...messageProps} />}
            >
                <ChannelInner  setIsEditing={setisEditing} />
            </Channel>
        </div>
    );
}

export default ChannelContainer;