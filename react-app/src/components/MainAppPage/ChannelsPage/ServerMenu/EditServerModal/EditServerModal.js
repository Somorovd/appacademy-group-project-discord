import { useState } from 'react';
import { useModal } from '../../../../../context/Modal';
import { useDispatch } from 'react-redux';
import * as serverActions from '../../../../../store/servers';
import './EditServerModal.css';

const Toggle = ({ isChecked, setIsChecked }) => {
  const toggleClass = 'toggle ' + (isChecked ? 'toggle-green' : 'toggle-gray');
  const sliderClass = 'slider ' + (isChecked ? 'checked' : 'unchecked');

  return (
    <div className="checkbox-container">
      <label htmlFor="visibility-box">
        <input
          id="visibility-box"
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
      </label>
      <div className={toggleClass}>
        <div className={sliderClass}>
          {isChecked ? (
            <i className="fa-solid fa-check"></i>
          ) : (
            <i className="fa-solid fa-xmark"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default function EditServerModal({ serverToEdit }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [name, setName] = useState(serverToEdit.name || '');
  const [image, setImage] = useState(serverToEdit.image || '');
  const [about, setAbout] = useState(serverToEdit.about || '');
  const [isChecked, setIsChecked] = useState(!serverToEdit.private);
  const [errors, setErrors] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    const updatedServer = {
      id: serverToEdit.id,
      name,
      image,
      private: !isChecked,
      about,
    };

    const data = await dispatch(serverActions.thunkEditServer(updatedServer));

    if (data.errors) {
      setErrors(data.errors);
    } else {
      closeModal();
    }
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
                src={image}
                alt=""
              />
            </div>
            <div className="edit-server-modal__input-container">
              <div className="edit-server-modal__img-input-container">
                <label htmlFor="server-image">Server Image</label>
                <input
                  id="server-image"
                  onChange={e => setImage(e.target.value)}
                  value={image}
                  autoComplete="off"
                />
                {errors.image && <p className="warning">{errors.image}</p>}
              </div>
              <div>
                <label htmlFor="server-name">Server Name</label>
                <input
                  id="server-name"
                  onChange={e => setName(e.target.value)}
                  value={name}
                  required
                  minLength={2}
                  maxLength={50}
                />
              </div>
            </div>
          </section>
          <div className="divider"></div>
          <section className="edit-server-modal__visibility-section">
            <div>
              <p>Would you like this server to be publicly visible?</p>
              <Toggle
                isChecked={isChecked}
                setIsChecked={setIsChecked}
              />
            </div>
          </section>
          <div className="divider"></div>
          <section className="edit-server-modal__about-section">
            <div>
              <label htmlFor="server-about">What is your server about?</label>
              <textarea
                id="server-about"
                onChange={e => setAbout(e.target.value)}
                value={about}
                maxLength={500}
              />
            </div>
          </section>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
