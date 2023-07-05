import OpenModalButton from '../../../OpenModalButton';
import DeleteServerModal from '../DeleteServerModal/DeleteServerModal';
import EditServerModal from '../EditServerModal/EditServerModal';
import './ServerMenu.css';

function DropdownListButton({ text, icon }) {
  return (
    <>
      <p>{text}</p>
      <i className={icon}></i>
    </>
  );
}

export default function ServerMenu({ singleUserServer }) {
  return (
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
  );
}
