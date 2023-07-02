import { useHistory } from "react-router-dom"

import "./ServerSidebarIcon.css"

export default function ServerSidebarIcon({ server, nav, className }) {

  const history = useHistory();

  const handleClick = () => {
    history.push(nav)
  }

  if (!server) return <></>

  return (
    <>
      <li
        className={"server-icon " + (className || "")}
        onClick={handleClick}
      >
        <img
          className="server-icon__image"
          src={server.image}
          alt=""
        />
        <span className="server-icon__tooltip">
          {server.name}
        </span>
      </li>
    </>
  )
}