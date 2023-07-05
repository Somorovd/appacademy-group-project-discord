import './ChannelLink.css'

export default function ChannelLink({
  channel,
  currentChannel,
  handleClick
}) {

  const className = (
    "channel-item" +
    (currentChannel === channel.id ? 'channel-item--selected' : '')
  );

  return (
    <li
      key={channel.id}
      className={className}
      onClick={handleClick}
    >
      <i class="fa-solid fa-hashtag"></i>
      <span>{channel.name}</span>
    </li>
  );
}