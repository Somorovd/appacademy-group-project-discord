import { useSelector } from "react-redux"
import './UserProfile.css'
import OpenModalButton from "../../OpenModalButton"
import UserMenu from "./UserMenu"

export default function UserProfile() {
    const user = useSelector(state => state.session.user)

    return (
        <div className="user-profile__div">
            <div className="user-profile__information">
                <img className="user-profile__image" src={user.profilePic}/> {user.username}
            </div>

            <div className="user-profile__settings">
                <OpenModalButton modalComponent={<UserMenu/>} buttonText={<i className="fa-solid fa-gear" />} buttonClass={"user-profile__open-profile-button"}/>
            </div>
        </div>
    )
}
