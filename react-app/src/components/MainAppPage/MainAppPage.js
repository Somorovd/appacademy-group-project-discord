import { Route, Switch } from 'react-router-dom';
import ServerSidebar from './ServerSiderbar';
import ConversationsPage from './ConversationsPage';
import ChannelsPage from './ChannelsPage';
import './MainAppPage.css';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export default function MainAppPage() {
  const user = useSelector(state => state.session.user)

  if (!user) {
    return <Redirect to="/" />
  }

  return (
    <>
      <div className="app-wrapper">
        <Switch>
          <Route
            path={[
              '/main/conversations/:communicationId',
              '/main/conversations',
            ]}
          >
            <ServerSidebar />
            <ConversationsPage />
          </Route>
          <Route
            path={[
              '/main/channels/:serverId/:channelId',
              '/main/channels/:serverId',
              '/main/channels',
            ]}
          >
            <ServerSidebar />
            <ChannelsPage />
          </Route>
        </Switch>
      </div>
    </>
  );
}

// Conversations
// <Switch>
// <Route path="/" exact>

// </Route>
// <Route path="/:id" exact>

// </Route>
// </Switch>
