import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../../../context/Modal";

import DeleteChannelModal from "./DeleteChannelModal";

import './ChannelLink.css'

export default function ChannelLink({ channel }) {
  const history = useHistory();
  const { serverId, channelId } = useParams();
  const { setModalContent } = useModal();
  const [isEditting, setIsEditting] = useState(false);

  const user = useSelector(state => state.session.user);
  const singleUserServer = useSelector(state => state.servers.singleUserServer);

  const handleClick = () => {
    if (channel.type === "text")
      history.push(`/main/channels/${serverId}/${channel.id}`);
    else if (channel.type === "voice")
      alert("Feature coming soon!");
  };

  const handleEdit = () => {
    setIsEditting(true);
  }

  const handleDelete = (e) => {
    e.stopPropagation();
    setModalContent(<DeleteChannelModal channel={channel} />);
  }

  const className = (
    "channel-item " +
    (channel.id === Number(channelId) ? 'channel-item--selected' : '')
  );

  return (
    <li
      key={channel.id}
      className={className}
      onClick={handleClick}
    >
      {
        channel.type === "text"
          ? <i className="fa-solid fa-hashtag"></i>
          : <i className="fa-solid fa-headset"></i>
      }
      <span>{channel.name}</span>
      {
        singleUserServer.ownerId === user.id &&
        <span className="channel-item__actions">
          <i
            className="fa-solid fa-pencil"
            onClick={handleEdit}
          ></i>
          <i
            className="fa-solid fa-trash"
            onClick={handleDelete}
          ></i>
        </span>
      }
    </li>
  );
}