import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../../context/Modal';
import * as serverActions from '../../../../store/servers';
import './CreateChannelFormModal.css';
import { useHistory } from 'react-router-dom';

export default function CreateChannelFormModal({ serverId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [type, setType] = useState('text');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState([]);
  const [attempted, setAttempted] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault();
    const channel = {
      server_id: serverId,
      type,
      name,
    };

    const data = await dispatch(
      serverActions.thunkCreateChannel(channel, serverId)
    );
    if (data.errors) {
      setErrors(data.errors);
    } else {
      closeModal();
      history.push(`/main/channels/${serverId}/${data.id}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (name.trim() && name.length <= 20)
        handleSubmit(e);
    }
  }

  return (
    <div className="create-channel-modal">
      <form
        className="create-channel-form"
        onSubmit={handleSubmit}
      >
        <header className="create-channel-form__header">
          <div>
            <h2>Create Channel</h2>
          </div>

          <div>
            <i
              onClick={closeModal}
              className="fa-solid fa-xmark create-channel-form__close-x"
            ></i>
          </div>
        </header>
        <div className="create-channel-form__main-section">
          <section className="create-channel-form__type-section">
            <h3>Channel Type</h3>
            <div className="create-channel-form__type-container">
              <div>
                <label htmlFor="text-type">Text</label>
                <input
                  id="text-type"
                  name="channel-type"
                  type="radio"
                  value="text"
                  checked={type === 'text'}
                  onChange={e => setType(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="voice-type">Voice</label>
                <input
                  id="voice-type"
                  name="channel-type"
                  type="radio"
                  value="voice"
                  checked={type === 'voice'}
                  onChange={e => setType(e.target.value)}
                />
              </div>
            </div>
          </section>
          <section className="create-channel-form__input-section">
            <label
              htmlFor="channel-name"
              className="create-channel-form__input-label"
            >
              Channel Name
              {attempted && name.length < 2 && <span className="create-channel__errors">-- Please input a name of 2 or greater</span>}
              {name.length >= 20 && <span className="create-channel__errors">-- Max length of 20 reached</span>}
            </label>
            <div className="create-channel-form__input-container">
              <i className="fa-solid fa-hashtag"></i>
              <input
                id="channel-name"
                placeholder="new-channel"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="off"
                maxLength={20}
                onKeyDown={handleKeyPress}
              />
            </div>
          </section>
        </div>
        <footer className="create-channel-form__footer">
          <div className="create-channel-form__btn-container">
            <button
              onClick={closeModal}
              className="create-channel-form__cancel-btn"
            >
              Cancel
            </button>
            <button
              className="create-channel-form__create-btn"
              disabled={name.trim() === '' || name.length > 20}
              onClick={() => setAttempted(true)}
            >
              Create Channel
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}
