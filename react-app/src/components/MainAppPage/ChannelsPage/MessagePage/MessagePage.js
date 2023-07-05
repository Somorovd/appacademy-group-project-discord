import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as channelActions from "../../../../store/channels";

import './MessagePage.css'

export default function MessagePage() {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const singleChannel = useSelector(
    state => state.channels.singleChannel
  );

  // const messageInput = useRef();

  // const submitMessage = (e) => {
  //   if (e.key !== "Enter") return;
  //   console.log("Validating ", content);
  //   if (!content.trim()) return;
  //   console.log("Sending ", content);
  //   setContent("");
  // }

  useEffect(() => {
    dispatch(channelActions.thunkGetChannel(channelId));
  }, [dispatch, channelId]);

  // useEffect(() => {
  //   messageInput.current.addEventListener("keydown", submitMessage);
  //   return () => {
  //     messageInput.current.removeEventListener("keydown", submitMessage);
  //     setContent("");
  //   }
  // }, [singleChannel, messageInput.current]);

  const handleSubmit = () => {

  }

  return (
    <div className='channels-messages'>
      <div className='message-container'>
        {singleChannel
          ? `Displaying messages for ${singleChannel.name}`
          : ''}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            id="message-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Message ${singleChannel.name}`}
          // ref={messageInput}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}
