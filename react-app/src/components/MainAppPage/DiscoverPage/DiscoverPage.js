import { useEffect, useState } from 'react';
import './DiscoverPage.css';
import ServerCard from './ServerCard';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllPublicServers } from '../../../store/servers';
import UserProfile from '../UserProfile'

export default function DiscoverPage () {
    const dispatch = useDispatch();
    const servers = useSelector(state => Object.values(state.servers.discoverServers));
    const [privateKey, setPrivateKey] = useState("")
    const [filteredServers, setFilteredServers] = useState(servers)
    const [serverSearch, setServerSearch] = useState("")

    useEffect(() => {
        dispatch(thunkGetAllPublicServers());
    }, [dispatch])

    useEffect(() => {
        setFilteredServers(
            servers.filter(server => {
                return server.name.toLowerCase().startsWith(serverSearch.toLowerCase())
            })
        )
    },[serverSearch])

    return (
        <>
            <div className="discover-page__private-server">
                <div className='discover-page__private-div'>
                        <h2>Join Private Server</h2>
                        <p>Enter a private server key and click join!</p>
                        <input type='numeric' placeholder='Private Key' value={privateKey} onChange={(e) => setPrivateKey(e.target.value)}/>
                        <button disabled={privateKey.length === 0} onClick={() => alert("Feature Coming Soon!")}>JOIN!</button>
                </div>
                <UserProfile />
            </div>
            <div className="discover-page__discover">
                <div className="discover-page__search-bar">
                    <h2>Find your server on Concord</h2>
                    <p>From gaming to music to learning there's a place for you.</p>
                    <input
                    className="discover-page__search-server" placeholder="Explore servers"
                    value={serverSearch}
                    onChange={(e) => setServerSearch(e.target.value)}
                    />
                </div>
                <div className="discover-page__main-div">
                    <div className="discover-page__list">
                        {filteredServers.map(server => <ServerCard server={server} />)}
                    </div>
                </div>
            </div>
        </>
    )
}
