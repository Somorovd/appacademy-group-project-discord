import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { thunkLoadSingleCommunication } from "../../../store/communications";

export default function DirectMessages() {
  const { communicationId } = useParams();
  const dispatch = useDispatch();
  const [currentRedi, setRedi] = useState(false)
  const messages = useSelector(
    (state) => Object.values(state.communications.singleCommunication.messages)
  );

  useEffect(() => {
    (async () => {
      const res = await dispatch(thunkLoadSingleCommunication(communicationId));
      if (res.payload.communication.id === undefined) {
        setRedi(true)
      }
    })();
  }, [dispatch, communicationId]);

  //checks to see if currentUser has active communication by searching comId, if not setRedi is set to True
  //and is redirected to DMS with no conversations open
  if (currentRedi) {
    return <Redirect to="/main/conversations" />
  }

  messages.sort((a,b) => {
    const createdAtA = new Date(a.createdAt)
    const createdAtB = new Date(b.createdAt)
    return createdAtA > createdAtB
  })

  console.log(messages)

  return (
    <div>
        <ul>
            {messages.map(message => {
                return (
                    <li key={message.id}>
                        <div><img src={message.senderPic}/>{message.sender}</div>
                        <div>{message.content}</div>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}
