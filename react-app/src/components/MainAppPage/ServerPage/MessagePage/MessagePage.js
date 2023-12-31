import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import MessageCard from '../../MessageCard';
import * as channelActions from '../../../../store/channels';
import * as messageActions from '../../../../store/messages';

import './MessagePage.css';

export default function MessagePage() {
  const { serverId, currentChannelId } = useParams();
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const singleChannel = useSelector(state => state.channels.singleChannel);

  useEffect(() => {
    dispatch(channelActions.thunkGetChannel(currentChannelId));
  }, [dispatch, currentChannelId]);

  const handleSubmit = async e => {
    e.preventDefault();
    const messageContent = content.trim();
    if (!messageContent) {
      return setContent('');
    }

    const messageObj = {
      server_id: serverId,
      channel_id: currentChannelId,
      content: messageContent,
    };

    dispatch(messageActions.thunkCreateMessage(messageObj));
    setContent('');
  };

  const handleDelete = messageId => {
    dispatch(messageActions.thunkDeleteMessage(messageId));
  };

  const handleEdit = (messageId, messageContent) => {
    // need consistant validation for create and edit
    const messageObj = {
      message_id: messageId,
      server_id: serverId,
      channel_id: currentChannelId,
      content: messageContent,
    };

    dispatch(messageActions.thunkEditMessage(messageObj));
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && content !== '') {
      handleSubmit(e);
    }
  };

  return (
    <div className="channels-messages">
      <div className="channel-header">{singleChannel.name}</div>
      <div className="message-container">
        {singleChannel.messages &&
          singleChannel.serverId === Number(serverId) &&
          singleChannel.messages.map(message => (
            <MessageCard
              message={message}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              key={message.id}
            />
          ))}
      </div>
      <div className="message-input">
        <form onSubmit={handleSubmit}>
          <input
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder={`Message ${singleChannel.name}`}
            onKeyDown={handleKeyPress}
            maxLength={500}
          />
          <button>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </form>
        {content.length >= 500 && (
          <span className="DM-page__error">
            Max message length of 500 has been reached
          </span>
        )}
      </div>
    </div>
  );
}
