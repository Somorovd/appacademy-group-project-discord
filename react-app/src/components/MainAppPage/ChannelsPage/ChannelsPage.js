import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import CreateChannelFormModal from './CreateChannelFormModal';
import ServerMenu from './ServerMenu';
import ChannelLink from './ChannelLink';
import MessagePage from './MessagePage';
import OpenModalButton from '../../OpenModalButton';
import UserProfile from '../UserProfile';
import * as serverActions from '../../../store/servers';
import './ChannelsPage.css';

export default function ChannelsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId, channelId } = useParams();

  const singleUserServer = useSelector(state => state.servers.singleUserServer);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      const server = await dispatch(serverActions.thunkGetSingleServer(serverId));
      if (!server.id) history.push("/main/conversations")
    })();
  }, [dispatch, serverId]);

  useEffect(() => {
    if (singleUserServer.channels) {
      const keys = Object.keys(singleUserServer.channels);
      if (!keys.length) return;

      const channelId = Math.min(...keys);
      history.push(`/main/channels/${serverId}/${channelId}`);
    }
  }, [singleUserServer]);

  if (!serverId) history.push("/main/conversations")

  if (!singleUserServer.channels) // prevent page flashing
    return (
      <>
        <div className="app-nav">
          <div className="channels-nav"></div>
        </div>
        <div className="messages">
          <div className="channels-messages">

          </div>
        </div>
      </>
    );

  const channels = Object.values(singleUserServer.channels);

  return (
    <>
      <div className="app-nav">
        <ServerMenu server={singleUserServer} />

        <div className="channels-nav">
          <div className="channels-nav__header">
            <h2>Channels</h2>
            {user.id === singleUserServer.ownerId && (
              <OpenModalButton
                modalComponent={<CreateChannelFormModal serverId={serverId} />}
                buttonClass="channels-nav__create-channel-btn"
                buttonText={<i className="fa-solid fa-plus"></i>}
              />
            )}
          </div>
          <ul>
            {channels.filter(channel => channel.type === "text").map(channel => (
              <ChannelLink
                channel={channel}
                key={channel.id}
              />
            ))}
            {channels.filter(channel => channel.type === "voice").map(channel => (
              <ChannelLink
                channel={channel}
                key={channel.id}
              />
            ))}
          </ul>
        </div>
        <UserProfile />
      </div>
      <div className="messages"> <MessagePage /> </div>
    </>
  );
}
