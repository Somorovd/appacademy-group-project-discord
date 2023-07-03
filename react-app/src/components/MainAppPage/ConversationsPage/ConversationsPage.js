import "./ConversationsPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkLoadAllCommunications } from "../../../store/communications";
import { Link } from "react-router-dom";
import DirectMessages from "./DirectMessages";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../../OpenModalButton";
import NewDmForm from "./NewDmForm";

export default function ConversationsPage() {
  const DMs = useSelector((state) => state.communications.allCommunications);
  const dispatch = useDispatch();
  const { communicationId } = useParams();
  useEffect(() => {
    // (async () => {
    //   await dispatch(thunkLoadAllCommunications());
    // })();
    dispatch(thunkLoadAllCommunications());
  }, [dispatch]);

  return (
    <>
      <div className="app-nav conversations-nav">
        <div>
          Direct Messages <OpenModalButton modalComponent={<NewDmForm/>} buttonText={"+"}/>
        </div>
        <ul className="conversations-page__list">
          {Object.values(DMs).map((user) => {
            return (
              <li key={user.id} className="app-nav__list">
                <Link id="app-nav__list" to={`/main/conversations/${user.id}`}>
                  <img src={user.userPic} /> {user.userName}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="messages conversations-messages">
        {communicationId && <DirectMessages />}
      </div>
    </>
  );
}
