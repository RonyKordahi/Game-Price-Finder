import React, { useContext} from 'react'
import { Link } from "react-router-dom"
import styled from "styled-components"

import { useAuth0 } from "../auth0/auth0"
import FavoriteContext from "../../FavoriteContext"

function FavoriteList({game}) {

    const {state, actions: {removeFavorite}} = useContext(FavoriteContext);

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

    return (<ListWrapper status={state.status}>
        <StyledFav className="hover" to={state.status === "idle" && `/results/${userInput}/${steam}/${humble}/${gmg}/${gog}`}> 
            {userInput}
        </StyledFav>
        <RemoveButton status={state.status} 
        onClick={() => {
            if (state.status === "idle"){
                removeFavorite(body)
            }
        }} >
            ❌
        </RemoveButton>
    </ListWrapper>)
}

const RemoveButton = styled.div `
    position: absolute;
    right: 0;
    margin-left: 25px;
    margin-right: 2px;
    margin-top: 9px;
    cursor: ${props => props.status === "loading" ? "not-allowed" : "pointer"};
`

const ListWrapper = styled.div `
    display: flex;
    
    a {
        cursor: ${props => props.status === "loading" && "not-allowed"};
    }
`

const StyledFav = styled(Link) `
    margin: 5px 0px;
`

export default FavoriteList
