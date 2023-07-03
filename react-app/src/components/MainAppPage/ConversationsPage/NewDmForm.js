import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  thunkCreateNewDm,
  thunkLoadAllUsers,
} from "../../../store/communications";
import { useSelector } from "react-redux";
import "./NewDmForm.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../../context/Modal";

export default function NewDmForm() {
  const dispatch = useDispatch();
  const users = useSelector((state) =>
    Object.values(state.communications.allUsers)
  );
  const [userSearch, setUserSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selected, setSelected] = useState(null);
  const [redi, setRedi] = useState(false);
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
  }, [userSearch]);

  const handleNewDm = async () => {
      const res = await dispatch(thunkCreateNewDm(selected));
      setRedi(res);
  };

  if (redi) {
    closeModal()
    return <Redirect to={`/main/conversations/${redi}`} />;
  }

  if (users.length < 1) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <input
        placeholder="search for user"
        value={userSearch}
        onChange={(e) => setUserSearch(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user) => {
          return (
            <li
            key={user.id}
              value={user.id}
              onClick={() => setSelected(user.id)}
              className={`new-dm-form__${
                user.id === selected ? "selected" : ""
              }`}>
              {user.username}
            </li>
          );
        })}
      </ul>
      <button onClick={handleNewDm} disabled={!selected}>
        Create DM
      </button>
    </>
  );
}
