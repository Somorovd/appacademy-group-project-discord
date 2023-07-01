import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";

import * as serverActions from "../../../store/servers"

import ServerSidebarIcon from "./ServerSidebarIcon";
import "./ServerSidebar.css"

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
        {
          userServers.map((server, i) => (
            <ServerSidebarIcon server={server} key={i} />
          ))
        }
      </ul>
    </div>
  )
}