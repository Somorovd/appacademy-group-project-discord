import { useState } from "react";
import "./MessageCard.css"

export default function MessageCard({ message, socket, user, communicationId }) {
    const [editing, setEditing] = useState(false);
    const [editMessage, setEditMessage] = useState(message.content);

    const handleDelete = (messageId) => {
        socket.emit("chat", {
          user,
          content: "",
          room: communicationId,
          edited: false,
          deleted: messageId
         });
      }

      const handleEdit = (messageId, newContent) => {
        socket.emit("chat", {
          user,
          content: newContent,
          room: communicationId,
          edited: messageId,
          deleted: false
         });

         setEditing(false)
      }


    let formattedDate = new Date(message.updatedAt).toLocaleDateString("en-US",{
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );
    return (
      <li key={message.id} className="DM-page__list-message">
        <div className="DM-page__list-message-user">
          <img src={message.senderPic} />
          {message.sender} <span className="DM-page__list-message-date">{formattedDate}{" "}</span>
          {message.wasEdited && <span className="DM-page__list-message-date">- edited</span>}
          <button onClick={() => setEditing(!editing)}>Edit</button>
          <button onClick={() => handleDelete(message.id)}>Delete</button>
        </div>
        <div className={`DM-page__list-message-content ${!editing ? "" : "hidden"}`}>{message.content}</div>
        <div className={editing ? "" : "hidden"}>
            <input value={editMessage} onChange={(e) => setEditMessage(e.target.value)}/>
            <button onClick={() => handleEdit(message.id, editMessage)}>Save</button>
            <button onClick={() => {setEditMessage(message.content); setEditing(false)}}>Cancel</button>
        </div>
      </li>
    );
}
