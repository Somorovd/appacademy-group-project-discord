import { useState } from "react";
import "./MessageCard.css"

export default function MessageCard({ message, socket, user, communicationId }) {
    const [editing, setEditing] = useState(false);
    const [editMessage, setEditMessage] = useState(message.content);

    const handleDelete = (messageId) => {
        console.log("DELETING MESSAGE")
        socket.emit("chat", {
          user,
          content: "",
          room: communicationId,
          edited: false,
          deleted: messageId
         });
      }

      const handleEdit = (messageId, newContent) => {
        console.log("EDITING MESSAGE")
        socket.emit("chat", {
          user,
          content: newContent,
          room: communicationId,
          edited: messageId,
          deleted: false
         });

         setEditing(false)
      }

    let formattedDate = new Date(message.createdAt).toLocaleDateString("en-US",{
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );
    return (
      <>
        <div className="message-card__div">


          <div className="message-card__image">
            <img src={message.senderPic} />
          </div>


          <div className="message-card__message">

            <div className="message-card__title">
              {message.sender} <span className="message-card__list-message-date">{formattedDate}{" "}</span>
              {message.wasEdited && <span className="message-card__list-message-date">- edited</span>}
            </div>

            <div className="message-card__content">
              <div className={`message-card__list-message-content ${!editing ? "" : "hidden"}`}>{message.content}</div>

              <div className={editing ? "" : "hidden"}>
                <input className="message-card__edit-input" value={editMessage} onChange={(e) => setEditMessage(e.target.value)}/>
                <div >
                  <button className="message-card__hidden-save" onClick={() => handleEdit(message.id, editMessage)}>Save</button>
                  <button className="message-card__hidden-cancel" onClick={() => {setEditMessage(message.content); setEditing(false)}}>Cancel</button>
                </div>
              </div>

            </div>
          </div>


          <div className="message-card__buttons">
            {user.id === message.senderId && <>
            <button className="message-card__option-buttons" onClick={() => setEditing(!editing)}><i className="fa-solid fa-pencil"/></button>
            <button className="message-card__option-buttons" onClick={() => handleDelete(message.id)}><i className="fa-solid fa-trash"/></button>
            </>}
          </div>


        </div>
      </>
    );
}
