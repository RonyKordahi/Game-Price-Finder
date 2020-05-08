import React, { useEffect, useContext } from 'react'
import styled from "styled-components"

import { useAuth0 } from "../auth0/auth0"
import FavoriteContext from "../../FavoriteContext"

function FavoriteButton({favorite, userInput, steam, humble, gmg, gog}) {
    
    const {actions: { addFavorite, removeFavorite }} = useContext(FavoriteContext);

    const { user } = useAuth0();
    const id = user.sub.split("|")
    const _id = id[1];

    useEffect(() => {
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
        
        // runs the appropriate action based on the status of the favorite state
        if (favorite) {
            addFavorite(body);
        }
        else {
            removeFavorite(body)
        }
    }, [favorite])

    return (
        <ButtonWrapper favorite={favorite}>
            ☆
        </ButtonWrapper>
    )
}

const ButtonWrapper = styled.div `
    display: flex;
    justify-content: center;
    color: rgb(255,223,0);
    cursor: pointer;
    position: absolute;
    right: 0;
    width: 40px;
    border-radius: 50px;

    background: ${props => props.favorite && "rgb(255,223,0);"};
    color: ${props => props.favorite && "#19191a"};
`

export default FavoriteButton
