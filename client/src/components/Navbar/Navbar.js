import React from 'react'
import styled from "styled-components"
import { Link } from "react-router-dom"

import {useAuth0} from "../auth0/auth0"

function Navbar() {

    const { isAuthenticated, loginWithPopup, logout, user } = useAuth0();

    return (
        <NavWrapper>
            <HomeLink to="/" className="hover" >Home</HomeLink>
            {user && (<>
                <span>Signed in as {user.name}</span>
            </>)}
            <LoginAndOut>
                {!isAuthenticated && (
                    <LoginAndOut className="hover" onClick={() => loginWithPopup({})}>Log in</LoginAndOut>
                )}

                {isAuthenticated && (<>
                    <LoginAndOut><Link to="/profile" className="hover">Profile</Link></LoginAndOut>
                    <LoginAndOut className="hover" onClick={() => logout()}> Log out</LoginAndOut>
                </>)}
            </LoginAndOut>
        </NavWrapper>
    )
}

const HomeLink = styled(Link) `
    margin-left: 5px;
`
const LoginAndOut = styled.span `
    margin-right: 5px;
    margin-top: 5px;
`

const NavWrapper = styled.div `
    display: flex;
    justify-content: space-between;
    background-color: #19191a;
    height: 40px;
    font-size: 1.5em;
`

export default Navbar
