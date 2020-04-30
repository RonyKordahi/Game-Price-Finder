import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import GlobalStyles from "../../Globalstyles"
import Navbar from "../Navbar"
import Homepage from '../Homepage'
import SearchResults from '../SearchResults/SearchResults'
import ProfilePage from "../ProfilePage"

function App() {
  return (<>
    <Router>
      <GlobalStyles />
      <Navbar />
      <Switch>

        <Route exact path="/">
          <Homepage />
        </Route>

        <Route path="/results/:userInput/:steam/:humble/:gmg/:gog">
          <SearchResults />
        </Route>

        <Route path="/profile">
          <ProfilePage />
        </Route>

      </Switch>

    </Router>
  </>)
}

export default App
