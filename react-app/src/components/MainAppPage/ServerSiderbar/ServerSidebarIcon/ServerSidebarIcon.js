import "./ServerSidebarIcon.css"

export default function ServerSidebarIcon({ server }) {
  return (
    <>
      <li className="server-icon">
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