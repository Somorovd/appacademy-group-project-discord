import { useDispatch } from 'react-redux';
import { useModal } from '../../../../../context/Modal';
import * as channelActions from '../../../../../store/channels';

import './DeleteChannelModal.css';

export default function DeleteChannelModal({ channel }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    const data = dispatch(channelActions.thunkDeleteChannel(channel.id));
    if (!data.errors) {
      closeModal();
    }
  };

  return (
    <div className="delete-channel">
      <div className="delete-channel__header">
        <h2>Delete Channel</h2>
        <p>
          Are you sure you want to delete&nbsp;
          <span className="delete-channel__name">
            {channel.type === 'text' ? (
              <i className="fa-solid fa-hashtag"></i>
            ) : (
              <i className="fa-solid fa-headset"></i>
            )}
            {`${channel.name}`}
          </span>
          ? This cannot be undone.
        </p>
      </div>
      <div className="delete-channel__buttons">
        <button
          className="delete-channel__cancel-button"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="delete-channel__delete-button"
          onClick={handleDelete}
        >
          Delete Channel
        </button>
      </div>
    </div>
  );
}
