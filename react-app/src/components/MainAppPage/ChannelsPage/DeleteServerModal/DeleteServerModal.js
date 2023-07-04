import { useState } from "react";
import { useDispatch } from "react-redux";
import "./DeleteServerModal.css";
import { useModal } from "../../../../context/Modal";

import * as serverActions from "../../../../store/servers";

export default function DeleteServerModal({ serverToDelete }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name !== serverToDelete.name) {
      setErrors("You did not enter the server name correctly");
      return;
    }

    await dispatch(serverActions.thunkDeleteServer(serverToDelete.id));

  }

  return (
    <div className="delete-server-modal">
      <h2>
        Delete '{serverToDelete.name}'
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="server-name">
          Enter Server Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="error">
          {errors || ""}
        </p>
        <button onClick={closeModal}>Cancel</button>
        <button>Delete Server</button>
      </form>
    </div>
  )
}
