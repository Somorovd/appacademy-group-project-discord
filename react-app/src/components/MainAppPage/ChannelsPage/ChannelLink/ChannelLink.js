import './ChannelLink.css'

export default function ChannelLink({
  channel,
  currentChannel,
  handleClick
}) {

  console.log(`CurrentChannel ${currentChannel} channel: ${channel.id}`)

  const className = (
    "channel-item " +
    (currentChannel === channel.id ? 'channel-item--selected' : '')
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