import React, { useEffect } from 'react'
import styled from "styled-components"

import { useAuth0 } from "../auth0/auth0"

function FavoriteButton({favorite, userInput, steam, humble, gmg, gog}) {
    
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
        
        if (favorite) {
            fetch("/add/favorite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify(body),
            })
        }
        else {
            fetch("/remove/favorite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify(body),
            })
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

    background: ${props => props.favorite && "rgb(255,223,0, 0.5);"};
`

export default FavoriteButton
