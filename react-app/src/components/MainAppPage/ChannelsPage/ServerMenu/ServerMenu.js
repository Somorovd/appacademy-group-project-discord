import { useState, useEffect, useRef } from "react";

import DeleteServerModal from '../DeleteServerModal';
import EditServerModal from '../EditServerModal';
import OpenModalButton from '../../../OpenModalButton';

import './ServerMenu.css'

export default function ServerMenu({ server }) {

  const dropdownRef = useRef();

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = (e) => {
    e.stopPropagation();
    if (!showMenu) setShowMenu(true);
    else closeMenu(e);
  }

  const closeMenu = (e) => {
    if (dropdownRef.current && dropdownRef.current.contains(e.target)) return;
    else setShowMenu(false);
  }

  useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const dropdownClasses = (
    "server-dropdown " +
    (showMenu ? "" : " hidden ")
  );

  return (
    <div onClick={openMenu} className="server-menu">
      <h2>
        {server.name}
      </h2>
      <ul className={dropdownClasses} ref={dropdownRef}>
        <li className="server-dropdown__item">
          <DropdownListButton
            text="Edit Server"
            icon="fa-solid fa-pencil"
            buttonClass="server-dropdown__button"
            modalComponent={
              <EditServerModal serverToEdit={server} />
            }
          />
        </li>
        <li className="server-dropdown__item">
          <DropdownListButton
            text="Delete Server"
            icon="fa-solid fa-trash"
            buttonClass="server-dropdown__button dropdown--warning"
            modalComponent={
              <DeleteServerModal serverToDelete={server} />
            }
          />
        </li>
      </ul>
    </div>
  )
}

function DropdownListButton({
  text,
  icon,
  buttonClass,
  modalComponent,
}) {
  return (
    <OpenModalButton
      modalComponent={modalComponent}
      buttonClass={buttonClass}
      ButtonComponent={
        <>
          <span>{text}</span>
          <span><i className={icon}></i></span>
        </>
      }
    />
  );
}

