import React, { useState } from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import styled from "styled-components"

import GlobalStyles from "../../Globalstyles"
import Navbar from "../Navbar"
import Homepage from '../Homepage'
import SearchResults from '../SearchResults/SearchResults'
import ProfilePage from "../ProfilePage"
import ErrorPage from '../ErrorPage/ErrorPage'
import FavoriteBar from '../FavoriteBar/FavoriteBar'
import BetaWarning from '../BetaWarning/BetaWarning'

function App() {
  const [warning, setWarning] = useState(false);

  return (<>
    <Router>
      
      <GlobalStyles />
      <Navbar />
      <FavoriteBar />

      <Switch>
        <MoveLeft>

        <Route exact path="/">
          {/* conditional rendering of components? */}
          {!warning ? <BetaWarning setWarning={setWarning} /> : <Homepage />}
        </Route>

        <Route path="/results/:searchedTerm/:steam/:humble/:gmg/:gog">
          <SearchResults />
        </Route>

        <Route path="/profile">
          <ProfilePage />
        </Route>

        <Route path="/404">
          <ErrorPage />
        </Route>

        </MoveLeft>
      </Switch>
    </Router>
  </>)
}

const MoveLeft = styled.div `
  margin-left: 300px;
`
export default App
