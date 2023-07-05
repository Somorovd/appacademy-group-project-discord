import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { thunkLoadSingleCommunication } from "../../../store/communications";
import { io } from "socket.io-client";
import MessageCard from "./MessageCard";
import "./DM.css";


let socket;

export default function DirectMessages() {
  const dispatch = useDispatch();
  const history = useHistory()
  const { communicationId } = useParams();

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
    console.log("INITIAL CONNECTION")
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
      console.log("DISCONNECT FROM SOCKET")
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
    console.log("SENDING MESSAGE")
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
