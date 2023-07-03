import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

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
      const channelId = Math.min(...Object.keys(singleUserServer.channels));
      history.push(`/main/channels/${serverId}/${channelId}`);
    }
  }, [singleUserServer]);

  if (!serverId || !singleUserServer.channels) return <></>;

  const channels = Object.values(singleUserServer.channels);
  const singleChannel = singleUserServer.channels[channelId];

  return (
    <>
      <div className="app-nav channels-nav">
        <ul>
          {channels.map(channel => (
            <>
              <li
                className="channel-item"
                onClick={() =>
                  history.push(`/main/channels/${serverId}/${channel.id}`)
                }
              >
                <span>📄</span>
                <span>{channel.name}</span>
              </li>
            </>
          ))}
        </ul>
      </div>
      <div className="messages channels-messages">
        {singleChannel
          ? `Displaying messages for ${singleUserServer.name} -- ${singleChannel.name}`
          : ''}
      </div>
    </>
  );
}
