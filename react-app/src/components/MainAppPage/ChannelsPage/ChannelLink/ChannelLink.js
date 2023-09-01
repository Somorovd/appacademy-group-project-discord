import { useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from '../../../../context/Modal';

import DeleteChannelModal from './DeleteChannelModal';

import * as channelActions from '../../../../store/channels';
import * as serverActions from '../../../../store/servers';

import './ChannelLink.css';

export default function ChannelLink({ channelId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const editInput = useRef();
  const { serverId, currentChannelId } = useParams();
  const { setModalContent } = useModal();

  const user = useSelector(state => state.session.user);
  const singleUserServer = useSelector(state => state.servers.singleUserServer);
  const channel = useSelector(state => state.channels.allChannels[channelId]);

  const [isEditting, setIsEditting] = useState(false);
  const [name, setName] = useState(channel.name);
  const [errors, setErrors] = useState({});

  const handleClick = () => {
    if (channel.type === 'text')
      history.push(`/main/channels/${serverId}/${channel.id}`);
    else if (channel.type === 'voice') alert('Feature coming soon!');
  };

  const handleEdit = e => {
    e.stopPropagation();
    setIsEditting(true);
    editInput.current.focus({ focusVisible: true });
  };

  const handleDelete = e => {
    e.stopPropagation();
    setModalContent(<DeleteChannelModal channel={channel} />);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && name !== '') {
      handleSubmit();
    }
    if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    setIsEditting(false);
    setName(channel.name);
    setErrors({});
  };

  useEffect(() => {
    checkErrors();
  }, [name]);

  const checkErrors = () => {
    const errors = {};
    if (name.length < 2) errors.name = 'Name must be at least 2 characters';
    setErrors(errors);
  };

  const handleChange = e => {
    setName(e.target.value);
    checkErrors(e);
  };

  const handleSubmit = async e => {
    checkErrors();
    if (Object.keys(errors).length) return;

    const editedChannel = {
      id: Number(channel.id),
      name,
    };
    const data = await dispatch(channelActions.thunkEditChannel(editedChannel));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setIsEditting(false);
    }
  };

  const className =
    'channel-item ' +
    `channel-item--${channel.type}` +
    (channelId === Number(currentChannelId) ? 'channel-item--selected ' : '');

  return (
    <>
      <span className="warning">
        {isEditting && name.length === 20 && 'Max length of 20 reached'}
        {isEditting && errors.name}
      </span>
      <li
        key={channelId}
        className={className}
        onClick={handleClick}
      >
        {channel.type === 'text' ? (
          <i className="fa-solid fa-hashtag"></i>
        ) : (
          <i className="fa-solid fa-headset"></i>
        )}

        <input
          className={isEditting ? '' : 'invisible'}
          ref={editInput}
          value={name}
          onChange={handleChange}
          onBlur={cancelEdit}
          onKeyDown={handleKeyPress}
          minLength={2}
          maxLength={20}
          required
        />
        <span className={isEditting ? 'hidden' : 'channel-item__name'}>
          {name}
        </span>

        {singleUserServer.ownerId === user.id && !isEditting && (
          <span className="channel-item__actions">
            <i
              className="fa-solid fa-pencil"
              onClick={handleEdit}
            ></i>
            <i
              className="fa-solid fa-trash"
              onClick={handleDelete}
            ></i>
          </span>
        )}
      </li>
    </>
  );
}
