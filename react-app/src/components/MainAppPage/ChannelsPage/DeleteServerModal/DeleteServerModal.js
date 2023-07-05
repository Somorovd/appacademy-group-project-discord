import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './DeleteServerModal.css';
import { useModal } from '../../../../context/Modal';

import * as serverActions from '../../../../store/servers';

export default function DeleteServerModal({ serverToDelete }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if (name !== serverToDelete.name) {
      setErrors({
        name: 'You did not enter the server name correctly',
      });
      return;
    }

    const data = await dispatch(
      serverActions.thunkDeleteServer(serverToDelete.id)
    );
    if (data.errors) {
      setErrors(data.errors);
    } else {
      closeModal();
      history.push('/main/conversations');
    }
  };

  return (
    <div className="delete-server-modal">
      <form onSubmit={handleSubmit}>
        <h2 className="delete-server-modal__header">
          Delete '{serverToDelete.name}'
        </h2>
        <div className="delete-server-modal__main-content">
          <p className="delete-server-modal__warning">
            Are you sure you want to delete <span>{serverToDelete.name}</span>?
            This action cannot be undone.
          </p>
          <div className="delete-server-modal__input-container">
            <label
              htmlFor="server-name"
              className="delete-server-modal__input-label"
            >
              Enter Server Name
            </label>
            <input
              id="server-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
        </div>
        <footer className="delete-server-modal__footer">
          <div className="delete-server-modal__btn-container">
            <button
              type="button"
              onClick={closeModal}
              className="delete-server-modal__cancel-btn"
            >
              Cancel
            </button>
            <button className="delete-server-modal__delete-btn">
              Delete Server
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}
