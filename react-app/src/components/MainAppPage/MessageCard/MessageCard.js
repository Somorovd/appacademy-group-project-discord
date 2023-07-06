import { useState } from "react";
import { useSelector } from "react-redux";
import './MessageCard.css'

export default function MessageCard({
  message,
  handleEdit,
  handleDelete,
}) {
  const [editing, setEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(message.content);
  const user = useSelector(state => state.session.user);

  let formattedDate = new Date(message.createdAt)
    .toLocaleDateString("en-US",
      {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

  return (
    <div className="message-card__div">


      <div className="message-card__image">
        <img src={message.senderPic || message.user.profilePic} alt="" />
      </div>


      <div className="message-card__message">
        <div className="message-card__title">
          {message.sender || message.user.username}
          <span className="message-card__list-message-date">
            {formattedDate}{" "}
          </span>
          {
            message.wasEdited &&
            <span className="message-card__list-message-date">
              - edited
            </span>
          }
        </div>

        <div className="message-card__content">
          <div
            className={`message-card__list-message-content ${!editing ? "" : "hidden"}`}
          >
            {message.content}
          </div>

          <div className={editing ? "" : "hidden"}>
            <input
              className="message-card__edit-input"
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
            />
            <div >
              <button
                className="message-card__hidden-save"
                onClick={() => handleEdit(message.id, editMessage)}
              >
                Save
              </button>
              <button
                className="message-card__hidden-cancel"
                onClick={() => {
                  setEditMessage(message.content);
                  setEditing(false)
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="message-card__buttons">
        {(
          user.id === message.senderId ||
          user.id === message.user.id
        ) && <>
            <button
              className="message-card__option-buttons"
              onClick={() => setEditing(!editing)}>
              <i className="fa-solid fa-pencil" />
            </button>
            <button
              className="message-card__option-buttons"
              onClick={() => handleDelete(message.id)}>
              <i className="fa-solid fa-trash" />
            </button>
          </>}
      </div>
    </div>
  )
}
