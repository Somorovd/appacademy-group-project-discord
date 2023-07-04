import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  thunkCreateNewDm,
  thunkLoadAllUsers,
} from "../../../store/communications";
import { useSelector } from "react-redux";
import "./NewDmForm.css";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";

export default function NewDmForm() {
  const dispatch = useDispatch();
  const history = useHistory()

  const users = useSelector((state) =>
    Object.values(state.communications.allUsers)
  );
  const [userSearch, setUserSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selected, setSelected] = useState(null);
  const { closeModal } = useModal()

  useEffect(() => {
    (async () => {
      const res = await dispatch(thunkLoadAllUsers());
      setFilteredUsers(Object.values(res.payload));
    })();
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => {
        return user.username.toLowerCase().startsWith(userSearch.toLowerCase());
      })
    );
    const filterIds = filteredUsers.map(user => user.id)
    if(!filterIds.includes(selected)) {
      setSelected(null)
    }
  }, [userSearch]);

  const handleNewDm = async () => {
      const communicationId = await dispatch(thunkCreateNewDm(selected));
      closeModal()
      history.push(`/main/conversations/${communicationId}`)
  };

  if (users.length < 1) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="new-dm-form__div">
      <h3>Select a user to direct message</h3>
      <input
      className="new-dm-form__input"
        placeholder="Search for user"
        value={userSearch}
        onChange={(e) => setUserSearch(e.target.value)}
      />
      <ul className="new-dm-form__user-list">
        {filteredUsers.map((user) => {
          return (
            <li
            key={user.id}
              value={user.id}
              onClick={() => setSelected(user.id)}
              className={`app-nav__link new-dm-form__${
                user.id === selected ? "selected" : ""
              }`}>
              <img className="app-nav__img" src={user.profilePic} />{user.username}
            </li>
          );
        })}
      </ul>
      <button className="new-dm-form__button" onClick={handleNewDm} disabled={!selected}>
        Create DM
      </button>
    </div>
  );
}
