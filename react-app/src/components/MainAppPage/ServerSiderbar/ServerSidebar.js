import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";

import * as serverActions from "../../../store/servers"
import ServerSidebarIcon from "./ServerSidebarIcon";
import OpenModalButton from "../../OpenModalButton";
import "./ServerSidebar.css"
import CreateServerFormModal from "./CreateServerFormModal";
import LoginFormModal from "../../LoginFormModal";

const directMessageLink = {
  name: "Direct Messages",
  image: "",
}

const addServerLink = {
  name: "Add a Server",
  image: ""
}

const browseServersLink = {
  name: "Explore Discoverable Servers",
  image: ""
}

export default function ServerSidebar() {
  const dispatch = useDispatch();
  const allUserServers = useSelector((state) => state.servers.allUserServers);
  const userServers = Object.values(allUserServers);

  useEffect(() => {
    dispatch(serverActions.thunkGetAllUserServers())
  }, [dispatch])


  return (
    <div className="server-sidebar">
      <ul className="server-list">
        <ServerSidebarIcon
          server={directMessageLink}
          nav="/main/conversations"
          className="server-icon--messages"
        />
        {
          userServers.map((server, i) => (
            <ServerSidebarIcon
              server={server}
              nav={`/main/channels/${server.id}`}
              key={i} />
          ))
        }
        <div className="server-icon server-icon--add-server">
          <OpenModalButton
            modalComponent={<CreateServerFormModal />}
          />
        </div>
        <ServerSidebarIcon
          server={browseServersLink}
          nav="/main/channels"
          className="server-icon--browse-servers"
        />
      </ul>
    </div>
  )
}