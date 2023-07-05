import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import ChannelMessageCard from './ChannelMessageCard/ChannelMessageCard';
import * as channelActions from '../../../../store/channels';

import './MessagePage.css';

let socket;

export default function MessagePage() {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const singleChannel = useSelector(state => state.channels.singleChannel);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    socket = io();
    dispatch(channelActions.thunkGetChannel(channelId));

    socket.on('messages', data => {
      dispatch(channelActions.thunkGetChannel(channelId));
    });

    socket.emit('join', {
      room: `Channel-${channelId}`,
    });
  }, [dispatch, channelId]);

  const handleSubmit = async e => {
    e.preventDefault();
    socket.emit('messages', {
      user,
      content,
      room: `Channel-${channelId}`,
      channel_id: channelId,
    });

    setContent('');
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && content !== '') {
      console.log(content);
      handleSubmit(e);
    }
  };

  if (!Object.keys(singleChannel).length) return <h1>Loading...</h1>;

  return (
    <div className="channels-messages">
      <div className="message-container">
        {singleChannel.messages.map(message => (
          <ChannelMessageCard
            key={message.id}
            message={message}
            user={user}
            socket={socket}
          />
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            id="message-input"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder={`Message ${singleChannel.name}`}
            onKeyDown={handleKeyPress}
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}
