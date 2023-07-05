import './ServerCard.css'

export default function ServerCard({ server }) {
    return (
        <div className="server-card__div">
            <div className="server-card__top">
                <img className='server-card__image' src={server.image} alt="server preview"/>
            </div>
            <div className='server-card__description'>
                <h4 className='server-card__name'>{server.name}</h4>
                <p className='server-card__about'>{server.about}</p>
            </div>
            <button className='server-card__join'>Join Server</button>
        </div>
    )
}
