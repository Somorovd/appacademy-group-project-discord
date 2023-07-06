import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import * as serverActions from '../../../store/servers';
import ServerSidebarIcon from './ServerSidebarIcon';
import OpenModalButton from '../../OpenModalButton';
import './ServerSidebar.css';
import CreateServerFormModal from './CreateServerFormModal';

export default function ServerSidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allUserServers = useSelector(state => state.servers.allUserServers);
  const userServers = Object.values(allUserServers);

  useEffect(() => {
    dispatch(serverActions.thunkGetAllUserServers());
  }, [dispatch]);

  return (
    <div className="server-sidebar">
      <ul className="server-list">
        <div
          className="server-icon server-icon--messages"
          onClick={() => history.push('/main/conversations')}
        >
          <span className="server-icon__tooltip">Direct Messages</span>
        </div>
        {userServers.map((server, i) => (
          <ServerSidebarIcon
            server={server}
            key={i}
          />
        ))}
        <div className="server-icon server-icon--add-server">
          <OpenModalButton modalComponent={<CreateServerFormModal />} buttonText={<i class="fa-solid fa-plus"></i>}/>
          <span className="server-icon__tooltip">Add Server</span>
        </div>
        <div
          className="server-icon server-icon--browse-servers"
          onClick={() => history.push('/main/discover')}
        >
          <i class="fa-solid fa-compass"></i>
          <span className="server-icon__tooltip">
            Explore Discoverable Servers
          </span>
        </div>
      </ul>
    </div>
  );
}
