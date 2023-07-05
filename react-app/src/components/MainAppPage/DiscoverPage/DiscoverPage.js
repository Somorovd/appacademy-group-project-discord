import { useEffect } from 'react';
import './DiscoverPage.css';
import ServerCard from './ServerCard';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllPublicServers } from '../../../store/servers';

export default function DiscoverPage () {
    const dispatch = useDispatch();
    const servers = useSelector(state => Object.values(state.servers.discoverServers));

    useEffect(() => {
        dispatch(thunkGetAllPublicServers());
    }, [dispatch])


    return (
        <>
            <div className="discover-page__private-server">
                Column
            </div>
            <div className="discover-page__discover">
                <div className="discover-page__search-bar">
                    <h3>Find your server on Concord</h3>
                    <p>From gaming to music to learning there's a place for you.</p>
                    <input className="discover-page__search-server" placeholder="Explore servers"/>
                </div>
                <div className="discover-page__main-div">
                    <div className="discover-page__list">
                        {servers.map(server => <ServerCard server={server} />)}
                    </div>
                </div>
            </div>
        </>
    )
}
