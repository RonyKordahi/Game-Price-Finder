import React from 'react'
import styled from "styled-components"
import { useHistory } from 'react-router-dom'

function BackButton() {
    const history = useHistory();

    return (
        <Back className="hover"
        onClick={() => {
            history.goBack();
        }}>
            ↩ Go Back
        </Back>
    )
}

const Back = styled.h1 `
    margin: auto;
    width: 180px;
    margin-top: 17px;
`

export default BackButton
