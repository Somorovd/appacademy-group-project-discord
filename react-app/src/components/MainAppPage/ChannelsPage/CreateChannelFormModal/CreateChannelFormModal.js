import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../../context/Modal';
import * as serverActions from '../../../../store/servers';
import './CreateChannelFormModal.css';

export default function CreateChannelFormModal({ serverId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [type, setType] = useState('text');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    const channel = {
      server_id: serverId,
      type,
      name,
    };

    const data = dispatch(serverActions.thunkCreateChannel(channel, serverId));
    if (data) setErrors(data);
    else closeModal();
  };

  return (
    <div className="form-wrapper">
      <form
        className="create-channel-form"
        onSubmit={handleSubmit}
      >
        <header className="create-channel-form__header">
          <div>
            <h2>Create Channel</h2>
          </div>
          <div>
            <span onClick={closeModal}>X</span>
          </div>
        </header>
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
        <section className="create-channel-form__channel-input">
          <label htmlFor="channel-name">Channel Name</label>
          <div>
            <span>#</span>
            <input
              id="channel-name"
              placeholder="new channel"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </section>
        <section>
          <button onClick={closeModal}>Cancel</button>
          <button>Create Channel</button>
        </section>
      </form>
    </div>
  );
}
