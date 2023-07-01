import { Route, Switch } from "react-router-dom";
import ServerSidebar from "./ServerSiderbar";
import ConversationsPage from "./ConversationsPage";
import ChannelsPage from "./ChannelsPage";
import "./MainAppPage.css"

export default function MainAppPage() {
  return (
    <>
      <div className="app-wrapper">
        <ServerSidebar />
        <Switch>
          <Route path={["/main/conversations/:communicationId", "/main/conversations"]}>
            <ConversationsPage />
          </Route>
          <Route path={[
            "/main/channels/:serverId/:channelId",
            "/main/channels/:serverId",
            "/main/channels",
          ]}>
            <ChannelsPage />
          </Route>
        </Switch>
      </div>
    </>
  )
}

// Conversations
// <Switch>
// <Route path="/" exact>

// </Route>
// <Route path="/:id" exact>

// </Route>
// </Switch>
