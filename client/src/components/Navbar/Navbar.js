import React from 'react'
import styled from "styled-components"
import { Link } from "react-router-dom"

import {useAuth0} from "../auth0/auth0"

function Navbar() {

    const { isAuthenticated, loginWithPopup, logout, user } = useAuth0();

    return (
        <NavWrapper>
            <MoveFromTop><HomeLink to="/" className="hover" >Price Check</HomeLink></MoveFromTop>
            {user && (<>
                <MoveFromTop><span>Signed in as {user.name}</span></MoveFromTop>
            </>)}
            <LoginAndOut>
                {/* if user is not logged in */}
                {!isAuthenticated && (
                    <LoginAndOut className="hover" onClick={() => loginWithPopup({})}>Sign in</LoginAndOut>
                )}

                {/* if user is logged in */}
                {isAuthenticated && (<>
                    <LoginAndOut><Link to="/profile" className="hover">Profile</Link></LoginAndOut>
                    <LoginAndOut className="hover" onClick={() => logout()}>Sign out</LoginAndOut>
                </>)}
            </LoginAndOut>
        </NavWrapper>
    )
}

const MoveFromTop = styled.div `
    margin-top: 10px;

    span {
        position: absolute;
        left: 50%;
    }
`

const HomeLink = styled(Link) `
    margin-left: 73px;
`
const LoginAndOut = styled.span `
    margin-right: 5px;
    margin-top: 10px;
`

const NavWrapper = styled.div `
    display: flex;
    justify-content: space-between;
    background-color: #19191a;
    border-bottom: #BFBFBF solid 1px;
    height: 50px;
    font-size: 1.5em;
`

export default Navbar
