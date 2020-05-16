import React from 'react'
import styled from "styled-components"

function BetaWarning({setWarning}) {
    return (
        <WarningWrap>
            <h1>A few things to know before you start</h1>
            <h2>1. This application is a WIP demo, progress will be a little slow</h2>
            <h2>2. Currently the application only works with <span>exact name matches</span> for game searches</h2>
            <h2>3. The GOG parsing occasionally returns the wrong pricing information (reason unknown)</h2>
            <h2>4. The server is hosted on Heroku, it may take up to 30 seconds for your favorites to load</h2>
            <h2>5. Due to Heroku region limitations, the app only returns US market information</h2>
            <ContinueButton 
            className="hover"
            onClick={() => setWarning(true)}>
                Continue
            </ContinueButton>
        </WarningWrap>
    )
}

const ContinueButton = styled.div `
    font-size: 2em;
    width: 200px;
    margin: auto;
`

const WarningWrap = styled.div `
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

export default BetaWarning
