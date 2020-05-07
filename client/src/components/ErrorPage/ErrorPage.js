import React from 'react'
import styled from "styled-components"

import BackButton from '../BackButton'

function ErrorPage() {
    return (
        <ErrorWrapper>
            <h1>Error: No store selected!</h1>
            <h1>Please select a store before searching for a game!</h1>
            <BackButton />
        </ErrorWrapper>
    )
}

const ErrorWrapper = styled.div `
    margin-top: 10px;
    text-align: center;
`

export default ErrorPage
