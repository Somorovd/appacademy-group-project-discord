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
            {channels.map(channel => (
              <ChannelLink
                channel={channel}
                key={channel.id}
              />
            ))}
          </ul>
        </div>
        <UserProfile />
      </div>
      <div className="messages">{channelId ? <MessagePage /> : null}</div>
    </>
  );
}
