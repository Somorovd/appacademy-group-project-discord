import { useHistory } from 'react-router-dom';

import './ServerSidebarIcon.css';
import { useParams } from 'react-router-dom';

export default function ServerSidebarIcon({ server, className }) {
  const { serverId } = useParams();
  const history = useHistory();

  const handleClick = () => {
    if (server.id !== Number(serverId)) {
      history.push(`/main/channels/${server.id}`);
    }
  };

  if (!server) return <></>;

  return (
    <>
      <li
        className={'server-icon ' + (className || '')}
        onClick={handleClick}
      >
        <img
          className="server-icon__image"
          src={server.image || ''}
          alt=""
        />
        <span className="server-icon__tooltip">{server.name}</span>
      </li>
    </>
  );
}
