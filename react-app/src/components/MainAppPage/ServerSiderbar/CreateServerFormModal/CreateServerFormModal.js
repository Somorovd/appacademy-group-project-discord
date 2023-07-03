import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../../context/Modal";

import * as serverActions from "../../../../store/servers";
import "./CreateServerFormModal.css"

export default function CreateServerFormModal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const [name, setName] = useState(`${user.username}'s server`);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverObject = {
      owner_id: user.id,
      name,
      image,
      private: true,
      about: ""
    }

    const data = await dispatch(serverActions.thunkCreateServer(serverObject));
    if (data) setErrors(data);
    else closeModal()

    console.log(errors);
  }

  return (
    <div className="form-wrapper">
      <form className="server-form" onSubmit={handleSubmit}>
        <h2>
          Customize your server
        </h2>
        <p>
          Give your new server a personality with a name and an icon.
          You can always change it later.
        </p>
        <img src={preview} alt="" />
        <ul>
          {errors.map((e) => (<li>{e}</li>))}
        </ul>
        <label>
          Server Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Profile URL
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            onBlurCapture={(e) => setPreview(e.target.value)}
          />
        </label>
        <button type="submit">Create Server</button>
      </form>
    </div>
  )
}