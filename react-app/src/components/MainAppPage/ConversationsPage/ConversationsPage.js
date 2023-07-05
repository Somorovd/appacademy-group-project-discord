import "./ConversationsPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkLoadAllCommunications } from "../../../store/communications";
import { Link } from "react-router-dom";
import DirectMessages from "./DirectMessages";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../../OpenModalButton";
import NewDmForm from "./NewDmForm";
import UserProfile from "../UserProfile/UserProfile";

export default function ConversationsPage() {
  const DMs = useSelector((state) => state.communications.allCommunications);
  const dispatch = useDispatch();
  const { communicationId } = useParams();
  const [otherUser, setOtherUser] = useState(null)

  useEffect(() => {
    dispatch(thunkLoadAllCommunications());
  }, [dispatch]);

  return (
    <>
      <div className="app-nav conversations-nav">
        <div className="conversations-page__title-button">
          Direct Messages <OpenModalButton modalComponent={<NewDmForm/>} buttonText={"+"} buttonClass={"new-dm-button"}/>
        </div>
        <ul className="conversations-page__list">
          {Object.values(DMs).map((user) => {
            return (
              <li key={user.id} className="app-nav__list" onClick={() => setOtherUser(user)}>
                <Link className="app-nav__link" to={`/main/conversations/${user.id}`}>
                  <img className="app-nav__img" src={user.userPic} /> {user.userName}
                </Link>
              </li>
            );
          })}
        </ul>
        <UserProfile />
      </div>

      <div className="messages conversations-messages">
        {communicationId && <DirectMessages otherUser={otherUser}/>}
      </div>
    </>
  );
}
