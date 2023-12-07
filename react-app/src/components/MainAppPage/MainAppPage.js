import { Route, Switch } from 'react-router-dom';
import ServerSidebar from './ServerSiderbar';
import ConversationsPage from './ConversationsPage';
import ServerPage from './ServerPage';
import './MainAppPage.css';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import DiscoverPage from './DiscoverPage/DiscoverPage';

export default function MainAppPage() {
  const user = useSelector(state => state.session.user);

  if (!user) {
    return <Redirect to="/" />;
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
              '/main/channels/:serverId/:currentChannelId',
              '/main/channels/:serverId',
              '/main/channels',
            ]}
          >
            <ServerSidebar />
            <ServerPage />
          </Route>
          <Route path="/main/discover">
            <ServerSidebar />
            <DiscoverPage />
          </Route>
        </Switch>
      </div>
    </>
  );
}
