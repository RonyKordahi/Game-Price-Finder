import React, { useEffect, useContext } from 'react'
import styled from "styled-components"
import SearchBar from '../SearchBar';

import FavoriteContext from "../../FavoriteContext"
import { useAuth0 } from "../auth0/auth0";

function Homepage() {

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
        <HomeWrap>
            <h2>Which game are you looking for?</h2>
            <SearchBar />
        </HomeWrap>
    </>)
}

const HomeWrap = styled.div `
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 300px;

    h2 {
        margin-bottom: 20px;
    }
`

export default Homepage
