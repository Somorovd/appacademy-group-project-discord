import { useState } from 'react';
import './ChannelMessageCard.css';
import { useParams } from 'react-router-dom';

export default function ChannelMessageCard({ message, user, socket }) {
  const { channelId } = useParams();
  const [editing, setEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(message.content);

  const handleDelete = () => {
    socket.emit('messages', {
      user,
      content: '',
      room: `Channel-${channelId}`,
      edited: false,
      deleted: message.id,
    });
  };

  const handleEdit = () => {
    socket.emit('messages', {
      user,
      content: editMessage,
      room: `Channel-${channelId}`,
      edited: message.id,
      deleted: false,
    });

    setEditing(false);
  };

  const formattedDate = new Date(message.updatedAt).toLocaleDateString(
    'en-US',
    {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }
  );

  return (
    <div className="channel-message-card">
      <div className="DM-page__list-message-user">
        <img
          src={message.user.profilePic}
          alt=""
        />
        {message.user.username}{' '}
        <span className="DM-page__list-message-date">{formattedDate} </span>
        {message.wasEdited && (
          <span className="DM-page__list-message-date">- edited</span>
        )}
        {user.id === message.user.id && (
          <>
            <button onClick={() => setEditing(!editing)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
      <div className={`DM-page__list-message-content`}>{message.content}</div>
      <div className={editing ? '' : 'hidden'}>
        <input
          value={editMessage}
          onChange={e => setEditMessage(e.target.value)}
        />
        <button onClick={handleEdit}>Save</button>
        <button
          onClick={() => {
            setEditMessage(message.content);
            setEditing(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
