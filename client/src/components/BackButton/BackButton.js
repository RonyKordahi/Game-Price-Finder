import React from 'react'
import { Link } from "react-router-dom"
import styled from "styled-components"

function BackButton() {
    return (
        <Back>
            <Link to="/" className="hover">↩ Go Back</Link>
        </Back>
    )
}

const Back = styled.h1 `
    margin: auto;
    width: 200px;
    margin-top: 17px;
`

export default BackButton
