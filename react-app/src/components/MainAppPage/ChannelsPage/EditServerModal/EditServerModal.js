import { useState } from 'react';
import { useModal } from '../../../../context/Modal';
import './EditServerModal.css';

export default function EditServerModal() {
  const { closeModal } = useModal();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [about, setAbout] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
  };

  return (
    <div className="edit-server-modal">
      <div className="edit-server-modal__nav"></div>
      <div className="edit-server-modal__form-container">
        <header className="edit-server-modal__heading">
          <h2>Server Overview</h2>
          <i
            onClick={closeModal}
            className="fa-regular fa-circle-xmark"
          ></i>
        </header>
        <form
          onSubmit={handleSubmit}
          className="edit-server-modal__form"
        >
          <section className="edit-server-modal__edit-section">
            <div className="edit-server-modal__image-container">
              <img
                src={''}
                alt=""
              />
            </div>
            <div className="edit-server-modal__input-container">
              <div>
                <label htmlFor="server-name">Server Name</label>
                <input
                  id="server-name"
                  onChange={e => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div>
                <label htmlFor="server-image">Server Image</label>
                <input
                  id="server-image"
                  onChange={e => setImage(e.target.value)}
                  value={image}
                />
              </div>
            </div>
          </section>
          <section className="edit-server-modal__community-section">
            <div>
              <label htmlFor="visibility-box">
                Would you like this server to be publicly visible?
              </label>
              <input
                id="visibility-box"
                type="checkbox"
                checked={!isPrivate}
                onChange={e => setIsPrivate(!isPrivate)}
              />
            </div>
            <div>
              <label htmlFor="server-about">What is your server about?</label>
              <textarea
                id="server-about"
                onChange={e => setAbout(e.target.value)}
                value={about}
              />
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
