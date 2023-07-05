import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import * as serverActions from '../../../store/servers';

import CreateChannelFormModal from './CreateChannelFormModal';
import DeleteServerModal from './DeleteServerModal';
import OpenModalButton from '../../OpenModalButton';
import EditServerModal from './EditServerModal/EditServerModal';
import './ChannelsPage.css';
function DropdownListButton({ text, icon }) {
  return (
    <>
      <p>{text}</p>
      <i className={icon}></i>
    </>
  );
}

function Channel({ channel, currentChannel, handleClick }) {
  return (
    <li
      key={channel.id}
      className={`channel-item ${
        currentChannel === channel.id ? 'channel-item--selected' : ''
      }`}
      onClick={handleClick}
    >
      <i class="fa-solid fa-hashtag"></i>
      <span>{channel.name}</span>
    </li>
  );
}

export default function ChannelsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId, channelId } = useParams();
  const [currentChannel, setCurrentChannel] = useState();

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

  const handleChannelClick = channel => {
    history.push(`/main/channels/${serverId}/${channel.id}`);
    setCurrentChannel(channel.id);
  };

  return (
    <>
      <div className="app-nav">
        <div className="server-menu">
          <h2>{singleUserServer.name}</h2>
          <div className="server-dropdown">
            <ul>
              <li className="dropdown__item">
                <OpenModalButton
                  modalComponent={
                    <EditServerModal serverToEdit={singleUserServer} />
                  }
                  buttonClass="list-button"
                  ButtonComponent={
                    <DropdownListButton
                      text="Edit Server"
                      icon="fa-solid fa-pencil"
                    />
                  }
                />
              </li>
              <li className="dropdown__item">
                <OpenModalButton
                  modalComponent={
                    <DeleteServerModal serverToDelete={singleUserServer} />
                  }
                  buttonClass="list-button"
                  ButtonComponent={
                    <DropdownListButton
                      text="Delete Server"
                      icon="fa-solid fa-trash-can"
                    />
                  }
                />
              </li>
            </ul>
          </div>
        </div>

        <div className="channels-nav">
          <div className="channels-nav__header">
            <h2>Channels</h2>
            <OpenModalButton
              modalComponent={<CreateChannelFormModal serverId={serverId} />}
              buttonClass="channels-nav__create-channel-btn"
              buttonText={'+'}
            />
          </div>
          <ul>
            {channels.map(channel => (
              <Channel
                channel={channel}
                handleClick={() => handleChannelClick(channel)}
                currentChannel={currentChannel}
              />
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
