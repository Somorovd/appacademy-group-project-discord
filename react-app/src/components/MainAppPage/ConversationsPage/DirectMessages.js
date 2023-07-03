import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { thunkLoadSingleCommunication } from "../../../store/communications";
import "./DM.css";
// import the socket
import { io } from "socket.io-client";

// outside of your component, initialize the socket variable
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

  useEffect(() => {
    (async () => {
      const res = await dispatch(thunkLoadSingleCommunication(communicationId));
      setChatMessages(Object.values(res.payload.messages));
      if (res.payload.communication.id === undefined) {
        setRedi(true);
      }
    })();
  }, [dispatch, communicationId]);

  useEffect(() => {
    // create websocket
    socket = io();

    // listen for chat events
    socket.on("chat", (chat) => {
      // when we recieve a chat, add it into our messages array in state
      setChatMessages((chatMessages) => [...chatMessages, chat]);
    });

    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, [communicationId]);

  //checks to see if currentUser has active communication by searching comId, if not setRedi is set to True
  //and is redirected to DMS with no conversations open
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
    // emit a message
    socket.emit("chat", { user, content: currentMessage, to: communicationId });
    // clear the input field after the message is sent
    setCurrentMessage("");
  }

  return (
    <div className="DM-page">
      <ul className="DM-page__list">
        {chatMessages.map((message) => {
          console.log(message);
          // come back to this tomorrow morning
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
                {message.wasEdited && <span>- edited</span>}
              </div>
              <div className="DM-page__list-message-content">{message.content}</div>
            </li>
          );
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
