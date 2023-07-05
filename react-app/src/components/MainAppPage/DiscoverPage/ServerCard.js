import { useDispatch } from 'react-redux'
import './ServerCard.css'
import { useHistory } from 'react-router-dom'
import { thunkGetAllUserServers } from '../../../store/servers'

export default function ServerCard({ server }) {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleJoinServer = async () => {
        const res = await fetch(`/api/servers/join/${server.id}`)
        const data = await res.json()
        dispatch(thunkGetAllUserServers())
        history.push(`/main/channels/${data.serverId}`)
    }

    return (
        <div className="server-card__div">
            <div className="server-card__top">
                <img className='server-card__image' src={server.image} alt="server preview"/>
            </div>
            <div className='server-card__description'>
                <h4 className='server-card__name'>{server.name}</h4>
                <p className='server-card__about'>{server.about}</p>
            </div>
            <button className='server-card__join' onClick={handleJoinServer}>Join Server</button>
        </div>
    )
}
