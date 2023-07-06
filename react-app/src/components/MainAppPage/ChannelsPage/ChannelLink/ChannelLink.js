import { useHistory, useParams } from "react-router-dom";

import './ChannelLink.css'

export default function ChannelLink({ channel }) {
  const history = useHistory();
  const { serverId, channelId } = useParams();

  const handleClick = () => {
    if (channel.type === "text")
      history.push(`/main/channels/${serverId}/${channel.id}`);
    else if (channel.type === "voice")
      alert("Feature coming soon!");
  };

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
    </li>
  );
}