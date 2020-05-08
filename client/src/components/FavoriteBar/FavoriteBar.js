import React, { useContext } from 'react'
import styled from "styled-components"

import { useAuth0 } from "../auth0/auth0"
import FavoriteList from './FavoriteList'
import FavoriteContext from "../../FavoriteContext"

function FavoriteBar() {
    const { user } = useAuth0();

    const { state } = useContext(FavoriteContext);

    return (<>
    <FavoriteWrapper>
        <h1>Your Favorites: </h1>
        
        {/* if the user is not signed in */}
        {!user && 
        <h4>
            Please sign in to view your favorites.
        </h4>}

        {/* if the user has no favorites */}
        {user && !(state.favorites.length) && 
        <h4>
            You have no favorites yet!
        </h4>}

        {/* if the user has favorites */}
        {user && state.favorites.length && 
        state.favorites.map(favorite => {
            return <FavoriteList game={favorite} key={Math.random() * 100000000} />
        })}

    </FavoriteWrapper>
    </>)
}

const FavoriteWrapper = styled.div `
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    left: 0;
    height: 100%;
    width: 300px;
    overflow: auto;
    background-color: #19191a;
    border-right: #BFBFBF solid 1px;

    h1 {
        margin: 5px 0px;
    }
`

export default FavoriteBar
