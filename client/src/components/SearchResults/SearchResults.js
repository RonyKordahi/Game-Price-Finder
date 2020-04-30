import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import styled from "styled-components"

import StoreInfo from '../StoreInfo/StoreInfo'
import { useAuth0 } from "../auth0/auth0"
import FavoriteButton from '../FavoriteButton'

function SearchResults() {
    const {userInput, steam, humble, gmg, gog} = useParams();
    
    const [game, setGame] = useState([]);
    const [favorite, setFavorite] = useState(false);

    const { user } = useAuth0();

    useEffect(() => {
        // backend will fetch the data conditionally based on these booleans (to save time)
        fetch(`/search/${userInput}/${steam}/${humble}/${gmg}/${gog}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                const {results} = data;
                setGame(results);
            });
    }, [userInput])

    return (<>
        {game.length ? <div>
            <Title>
                Displaying results for "{userInput}"
                {user && <div onClick={() => setFavorite(!favorite)}>
                    <FavoriteButton favorite={favorite} userInput={userInput} steam={steam} humble={humble} gmg={gmg} gog={gog} />
                </div>}
            </Title>
            {game.map(store => {
                return <>
                <Container key={Math.random() * 10000000}>
                    <StoreInfo store={store} key={Math.random() * 10000000} />
                </Container>
            </>})}
            <Back><Link to="/">↩ Go Back</Link></Back>
        </div> : 
        <>
            <Title key={Math.random() * 10000000}>Loading results for "{userInput}"</Title>
        </>}
    </>)
}

const Title = styled.h1 `
    display: flex;
    justify-content: center;
    margin: 15px auto;
    width: 700px;
    position: relative;
`

const Back = styled.h1 `
    margin: auto;
    width: 175px;
    margin-top: 20px;
    padding: 1px 3px;
    border: 1px solid #BFBFBF;   
`

const Container = styled.div `
    display: flex;
    justify-content: center;
    text-align: center;
    border: red solid 1px;
    width: 700px;
    margin: auto;
`

export default SearchResults
