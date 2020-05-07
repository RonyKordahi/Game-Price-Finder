import React, { useState, useContext} from 'react'
import { Link } from "react-router-dom"
import styled from "styled-components"

import { useAuth0 } from "../auth0/auth0"
import FavoriteContext from "../../FavoriteContext"

function FavoriteList({game}) {

    const {actions: {removeFavorite}} = useContext(FavoriteContext);

    const { user } = useAuth0();
    const id = user.sub.split("|")
    const _id = id[1];

    // for the body variable below, it would not accept game.steam, etc..
    const { userInput, 
            steam,
            humble, 
            gmg, 
            gog,} = game;

    const body = {
        _id,
        searched: {
            userInput,
            steam,
            humble,
            gmg,
            gog,
        }
    }

    // const [favorite, setFavorite] = useState(false);

    return (<ListWrapper>
        <StyledFav className="hover" to={`/results/${userInput}/${steam}/${humble}/${gmg}/${gog}`}> 
            {userInput}
        </StyledFav>
        <RemoveButton onClick={() => {
            removeFavorite(body)
        }} >
            ❌
        </RemoveButton>
    </ListWrapper>)
}

const RemoveButton = styled.div `
    position: absolute;
    right: 0;
    margin-left: 25px;
    margin-top: 9px;
    cursor: pointer;
`

const ListWrapper = styled.div `
    display: flex;
`

const StyledFav = styled(Link) `
    margin: 5px 0px;
`

export default FavoriteList
