import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { thunkLoadSingleCommunication } from "../../../store/communications";
import { io } from "socket.io-client";
import MessageCard from "./MessageCard";
import "./DM.css";


let socket;

export default function DirectMessages() {
  const { communicationId } = useParams();
  const dispatch = useDispatch();
  const [currentRedi, setRedi] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const messages = useSelector((state) =>
    Object.values(state.communications.singleCommunication.messages)
  );
  const user = useSelector((state) => state.session.user);
  const [chatMessages, setChatMessages] = useState(messages);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    (async () => {
      const res = await dispatch(thunkLoadSingleCommunication(communicationId));
      setChatMessages(Object.values(res.payload.messages));
      if (res.payload.communication.id === undefined) {
        setRedi(true);
      }
      setRefresh(false)
    })();
  }, [dispatch, communicationId, refresh]);

  useEffect(() => {
    socket = io();

    socket.on("chat", (chat) => {

      if(chat === "refresh") {
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


  if (currentRedi) {
    return <Redirect to="/main/conversations" />;
  }

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

  return (
    <div className="DM-page">
      <ul className="DM-page__list">
        {chatMessages.map((message) => {
          return (
            <li key={message.id} className="DM-page__list-message">
              <MessageCard message={message} socket={socket} user={user} communicationId={communicationId} />
            </li>
          )
        })}
      </ul>
      <div className="DM-page__chat-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Send a message!"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  );
}
