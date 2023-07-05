import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import CreateChannelFormModal from './CreateChannelFormModal';
import ServerMenu from './ServerMenu/ServerMenu';
import OpenModalButton from '../../OpenModalButton';

import * as serverActions from '../../../store/servers';
import './ChannelsPage.css';

export default function ChannelsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId, channelId } = useParams();

  const singleUserServer = useSelector(state => state.servers.singleUserServer);

  useEffect(() => {
    dispatch(serverActions.thunkGetSingleServer(serverId));
  }, [dispatch, serverId]);

  useEffect(() => {
    if (singleUserServer.channels) {
      const keys = Object.keys(singleUserServer.channels);
      if (!keys.length) return;

      const channelId = Math.min(...keys);
      history.push(`/main/channels/${serverId}/${channelId}`);
    }
  }, [singleUserServer]);

  if (!serverId || !singleUserServer.channels) return <></>;

  const channels = Object.values(singleUserServer.channels);
  const singleChannel = singleUserServer.channels[channelId];

  return (
    <>
      <div className="app-nav">
        <ServerMenu server={singleUserServer} />
        <div className="channels-nav">
          <div className="channels-nav__header">
            <h2>Channels</h2>
            <OpenModalButton
              modalComponent={<CreateChannelFormModal serverId={serverId} />}
              buttonClass="channels-nav__create-channel-btn"
              buttonText={<i class="fa-solid fa-plus"></i>}
            />
          </div>
          <ul>
            {channels.map(channel => (
              <li
                key={channel.id}
                className="channel-item"
                onClick={() =>
                  history.push(`/main/channels/${serverId}/${channel.id}`)
                }
              >
                {
                  channel.type === "text"
                    ? <i class="fa-solid fa-hashtag"></i>
                    : <i class="fa-solid fa-headset"></i>
                }
                <span>{channel.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="messages channels-messages">
        {singleChannel
          ? `Displaying messages for ${singleUserServer.name} -- ${singleChannel.name}`
          : ''}
      </div>
    </>
  );
}
