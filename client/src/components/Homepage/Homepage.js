import React, { useEffect, useContext, useState } from 'react'
import styled from "styled-components"
import SearchBar from '../SearchBar';

import FavoriteContext from "../../FavoriteContext"
import { useAuth0 } from "../auth0/auth0"

function Homepage() {

    const [warning, setWarning] = useState(false);
    const {actions: {firstLoad}} = useContext(FavoriteContext);
    const { user } = useAuth0();

    useEffect(() => {
        if(user) {
            const id = user.sub.split("|")
            const _id = id[1];
            firstLoad(_id)
        }
    }, [user])

    return (<>
        {warning ? <HomeWrap>
            <Logo src="/assets/logo.png" alt="logo" />
            <h2>Which game are you looking for?</h2>
            <SearchBar />
        </HomeWrap> 
        :
        <HomeWrap>
            <h1>A few things to know before you start</h1>
            <h2>1. This application is a WIP demo, progress will be a little slow</h2>
            <h2>2. Currently the application only works with <span>exact name matches</span> for game searches</h2>
            <h2>3. The GOG parsing occasionally returns the wrong pricing information (reason unknown)</h2>
            <h2>4. The server is hosted on Heroku, it may take up to 30 seconds for your favorites to load</h2>
            <h2>5. Due to Heroku region limitations, the HTML parsing only returns USD prices</h2>

            <ContinueButton 
            className="hover"
            onClick={() => setWarning(true)}>
                Continue
            </ContinueButton>
        </HomeWrap>}
    </>)
}

const ContinueButton = styled.div `
    font-size: 2em;
    width: 200px;
    margin: auto;
`

const Logo = styled.img `
    height: 350px;
    width: 550px;
    margin: auto;
`

const HomeWrap = styled.div `
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 30px;

    h1, h2 {
        margin-bottom: 20px;
    }

    h1, span {
        text-decoration: underline;
    }
`

export default Homepage
