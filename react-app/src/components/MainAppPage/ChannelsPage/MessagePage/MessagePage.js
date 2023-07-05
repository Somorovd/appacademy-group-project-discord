import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './MessagePage.css'

export default function MessagePage() {
  const { channelId } = useParams();

  const singleChannel = useSelector(
    state => state.servers.singleUserServer.channels[channelId]
  );

  return (
    <div className='channels-messages'>
      {singleChannel
        ? `Displaying messages for ${singleChannel.name}`
        : ''}
    </div>
  )
}
