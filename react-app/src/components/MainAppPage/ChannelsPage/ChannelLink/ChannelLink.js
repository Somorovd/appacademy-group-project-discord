import { useHistory, useParams } from "react-router-dom";

import './ChannelLink.css'

export default function ChannelLink({ channel }) {
  const history = useHistory();
  const { serverId, channelId } = useParams();

  const handleClick = () => {
    history.push(`/main/channels/${serverId}/${channel.id}`);
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
          ? <i class="fa-solid fa-hashtag"></i>
          : <i class="fa-solid fa-headset"></i>
      }
      <span>{channel.name}</span>
    </li>
  );
}