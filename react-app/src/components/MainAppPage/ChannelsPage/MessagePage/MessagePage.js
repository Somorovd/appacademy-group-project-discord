import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import MessageCard from '../../MessageCard';
import * as channelActions from '../../../../store/channels';
import * as messageActions from '../../../../store/messages';

import './MessagePage.css';

let socket;

export default function MessagePage() {
  const { serverId, currentChannelId } = useParams();
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const singleChannel = useSelector(state => state.channels.singleChannel);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    socket = io();
    dispatch(channelActions.thunkGetChannel(currentChannelId));

    socket.on('messages', data => {
      if (data) {
        dispatch(channelActions.thunkGetChannel(currentChannelId));
      }
    });

    socket.emit('join', {
      room: `Channel-${currentChannelId}`,
    });

    return () => socket.disconnect();
  }, [dispatch, currentChannelId]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!content.trim()) {
      setContent('');
      return;
    }
    console.log('sending');

    dispatch(messageActions.thunkCreateMessage(content));

    socket.emit('messages', {
      user,
      content,
      room: `Channel-${currentChannelId}`,
      channel_id: currentChannelId,
      edited: false,
      deleted: false,
    });

    setContent('');
  };

  const handleDelete = messageId => {
    socket.emit('messages', {
      user,
      content: '',
      room: `Channel-${currentChannelId}`,
      edited: false,
      deleted: messageId,
    });
  };

  const handleEdit = (messageId, content) => {
    socket.emit('messages', {
      user,
      content,
      room: `Channel-${currentChannelId}`,
      edited: messageId,
      deleted: false,
    });
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
