import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';

import CreateChannelFormModal from './CreateChannelFormModal';
import ServerMenu from './ServerMenu';
import ChannelLink from './ChannelLink';
import MessagePage from './MessagePage';
import OpenModalButton from '../../OpenModalButton';
import UserProfile from '../UserProfile';
import { store } from '../../../';
import * as serverActions from '../../../store/servers';
import './ServerPage.css';

let socket;

export default function ServerPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId } = useParams();

  const singleUserServer = useSelector(state => state.servers.singleUserServer);
  const channelIds = useSelector(
    state => state.servers.singleUserServer.channelIds
  );
  const channels = useSelector(state => state.channels.allChannels);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    socket = io();

    socket.on('messages', data => {
      if (data.payload.user.id !== user.id) {
        store.dispatch(data);
      }
    });

    socket.emit('join', {
      room: `Server-${serverId}`,
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    (async () => {
      const server = await dispatch(
        serverActions.thunkGetSingleServer(serverId)
      );
      if (!server.id) history.push('/main/conversations');
    })();
  }, [dispatch, serverId]);

  useEffect(() => {
    if (singleUserServer.channelIds) {
      const channelId = Math.min(
        ...channelIds.filter(id => channels[id].type !== 'voice')
      );
      history.push(`/main/channels/${serverId}/${channelId}`);
    }
  }, [singleUserServer, serverId]);

  if (!serverId) {
    history.push('/main/conversations');
  }

  if (!singleUserServer.channelIds) {
    // prevent page flashing
    return (
      <>
        <div className="app-nav">
          <div className="channels-nav"></div>
        </div>
        <div className="messages">
          <div className="channels-messages"></div>
        </div>
      </>
    );
  }

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
          <ul className="channels-nav__list">
            {channelIds.map(channelId => (
              <ChannelLink
                channelId={channelId}
                key={channelId}
              />
            ))}
          </ul>
        </div>
        <UserProfile />
      </div>
      <div className="messages">
        <MessagePage />
      </div>
    </>
  );
}
