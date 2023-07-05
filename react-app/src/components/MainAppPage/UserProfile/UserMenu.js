import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../../store/session";
import { useHistory } from 'react-router-dom'
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../../context/Modal";

export default function UserMenu () {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const { closeModal } = useModal()

    let userSince = new Date(user.createdAt).toLocaleDateString("en-US",{
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }
    );

    let userBirthday = new Date(user.birthday).toLocaleDateString("en-US",{
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }
    );

    const handleLogout = () => {
        dispatch(logout())
        closeModal()
    }

    return (
        <div className="user-menu__div">
            <div className="user-menu__top-color" />

            <div className="user-menu__top-menu">
                <div className="user-menu__top-title">
                <img className="user-menu__image" src={user.profilePic}/> {user.username}
                </div>
                <button onClick={(e) => alert("Feature Coming Soon!")} className="user-menu__edit-user-button">Edit User Profile</button>
            </div>

            <div className="user-menu__user-information">
                <div className="user-menu__information-slot">
                    <div className="user-menu__information-title">DISPLAY NAME</div>
                    <div>{user.username}</div>
                </div>

                <div className="user-menu__information-slot">
                    <div className="user-menu__information-title">EMAIL</div>
                    <div>{user.email}</div>
                </div>

                <div className="user-menu__information-slot">
                    <div className="user-menu__information-title">PHONE NUMBER</div>
                    <div>{user.phoneNumber}</div>
                </div>

                <div className="user-menu__information-slot">
                    <div className="user-menu__information-title">BIRTHDAY</div>
                    <div>{userBirthday}</div>
                </div>

                <div className="user-menu__information-slot">
                    <div className="user-menu__information-title">USER SINCE</div>
                    <div>{userSince}</div>
                </div>
            </div>

            <button className="user-menu__logout-user-button" onClick={handleLogout}>Logout</button>

        </div>
    )
}
