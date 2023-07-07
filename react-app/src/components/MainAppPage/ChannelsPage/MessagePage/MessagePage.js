import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import MessageCard from '../../MessageCard';
import * as channelActions from '../../../../store/channels';

import './MessagePage.css';

let socket;

export default function MessagePage() {
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const singleChannel = useSelector(state => state.channels.singleChannel);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    socket = io();
    dispatch(channelActions.thunkGetChannel(channelId));

    socket.on('messages', data => {
      if (data) {
        dispatch(channelActions.thunkGetChannel(channelId));
      }
    });

    socket.emit('join', {
      room: `Channel-${channelId}`,
    });

    return () => socket.disconnect();
  }, [dispatch, channelId]);

  const handleSubmit = async e => {
    e.preventDefault();
    socket.emit('messages', {
      user,
      content,
      room: `Channel-${channelId}`,
      channel_id: channelId,
      edited: false,
      deleted: false
    });

    setContent('');
  };

  const handleDelete = (messageId) => {
    socket.emit('messages', {
      user,
      content: '',
      room: `Channel-${channelId}`,
      edited: false,
      deleted: messageId,
    });
  };

  const handleEdit = (messageId, content) => {
    socket.emit('messages', {
      user,
      content,
      room: `Channel-${channelId}`,
      edited: messageId,
      deleted: false,
    });
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter' && content !== '') {
      handleSubmit(e);
    }
  };

  return (
    <div className="channels-messages">
      <div className='channel-header'>
        {singleChannel.name}
      </div>
      <div className="message-container">
        {
          Object.keys(singleChannel).length &&
          (singleChannel.serverId === Number(serverId)) &&
          singleChannel.messages.map(message => (
            <MessageCard
              message={message}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              key={message.id}
            />
          ))
        }
      </div>
      <div className='message-input'>
        <form onSubmit={handleSubmit}>
          <input
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder={`Message ${singleChannel.name}`}
            onKeyDown={handleKeyPress}
            maxLength={500}
          />
          <button>
            <i className='fa-solid fa-arrow-right'></i>
          </button>
        </form>
      </div>
        {content.length >= 500 && <span className="DM-page__error">Max message length of 500 has been reached</span>}
    </div>
  );
}
