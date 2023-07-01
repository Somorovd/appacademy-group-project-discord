import "./ServerSidebar.css"

export default function ServerSidebar() {
  return (
    <div className="server-sidebar">
      <ul className="server-list">
        <li className="server-icon">
          <img
            className="server-icon__image"
            src="image.png"
            alt=""
          />
          <span className="server-icon__tooltip">
            Server 1 Name
          </span>
        </li>
        <li className="server-icon">
          <img
            className="server-icon__image"
            src="image.png"
            alt=""
          />
          <span className="server-icon__tooltip">
            Server 1 Name
          </span>
        </li>
        <li className="server-icon">
          <img
            className="server-icon__image"
            src="image.png"
            alt=""
          />
          <span className="server-icon__tooltip">
            Server 1 Name
          </span>
        </li>
      </ul>
    </div>
  )
}