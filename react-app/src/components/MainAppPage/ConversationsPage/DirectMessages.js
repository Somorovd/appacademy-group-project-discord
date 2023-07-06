import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { thunkLoadSingleCommunication } from "../../../store/communications";
import { io } from "socket.io-client";
import MessageCard from "../MessageCard";
import "./DM.css";


let socket;

export default function DirectMessages({ otherUser }) {
  const { communicationId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory()

  const messages = useSelector((state) =>
    Object.values(state.communications.singleCommunication.messages)
  );
  const user = useSelector((state) => state.session.user);

  const [chatMessages, setChatMessages] = useState(messages);
  const [currentMessage, setCurrentMessage] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await dispatch(thunkLoadSingleCommunication(communicationId));
      setChatMessages(Object.values(res.payload.messages));
      if (res.payload.communication.id === undefined) {
        history.push("/main/conversations")
      }
      setRefresh(false)
    })();
  }, [dispatch, communicationId, refresh]);

  useEffect(() => {
    socket = io();

    socket.on("chat", (chat) => {

      if (chat === "refresh") {
        setRefresh(true)
      } else {
        setChatMessages((chatMessages) => [...chatMessages, chat]);
      }
    });

    socket.emit("join", {
      room: communicationId
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, communicationId]);

  messages.sort((a, b) => {
    const createdAtA = new Date(a.createdAt);
    const createdAtB = new Date(b.createdAt);
    return createdAtA > createdAtB;
  });

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("chat", {
      user,
      content: currentMessage,
      room: communicationId,
      edited: false,
      deleted: false
    });
    setCurrentMessage("");
  }

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
  }

  if (!otherUser) {
    history.push('/main/conversations')
  }

  return (
    <div className="DM-page">
      <div className="DM-page__top">
        <img src={otherUser?.profilePic} /> {otherUser?.userName}
      </div>
      <ul className="DM-page__list">
        {chatMessages.map((message) => {
          return (
            <li key={message.id} className="DM-page__list-message">
              <MessageCard
                message={message}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                key={message.id}
              />
            </li>
          )
        })}
      </ul>
      <div className="DM-page__chat-box">
        <form onSubmit={handleSubmit} className="DM-page__chat-form">
          <input
            type="text"
            placeholder={`Message @${otherUser?.userName}`}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="DM-page__chat-input"
          />
          <button type="submit" className="DM-page__chat-submit" disabled={currentMessage.length === 0}><i class="fa-solid fa-arrow-right"></i></button>
        </form>
      </div>
    </div>
  );
}
