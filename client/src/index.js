import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import {Auth0Provider} from "./components/auth0/auth0"
import history from "./components/auth0/history"
import config from "./components/auth0/config.json"
import {FavoriteProvider} from "./FavoriteContext"

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <FavoriteProvider>
          <App />
      </FavoriteProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
