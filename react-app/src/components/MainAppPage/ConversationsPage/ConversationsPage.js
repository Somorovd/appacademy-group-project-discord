import "./ConversationsPage.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkLoadAllCommunications } from "../../../store/communications";


export default function ConversationsPage() {
  const DMs = useSelector(state => state.communications.allCommunications);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(thunkLoadAllCommunications())
    })()

  }, [dispatch])

  if(Object.keys(DMs).length < 1) {
    return '<h1>Loading</h1>'
  }

  return (
    <>
      <div className="app-nav conversations-nav">
        {Object.values(DMs).map(user => {
          return (
            <h1>{user.userName}</h1>
          )
        })}
      </div>
      <div className="messages conversations-messages">
        direct messages
      </div>
    </>
  )
}
