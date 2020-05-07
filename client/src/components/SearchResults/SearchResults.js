import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import styled from "styled-components"

import StoreInfo from '../StoreInfo/StoreInfo'
import { useAuth0 } from "../auth0/auth0"
import FavoriteButton from '../FavoriteButton'
import SearchBar from '../SearchBar/SearchBar'
import BackButton from '../BackButton'
import SpinnerSrc from "../../assets/pacman.gif"

function SearchResults() {
    const {searchedTerm, steam, humble, gmg, gog} = useParams();
    
    const [game, setGame] = useState([]);
    const [favorite, setFavorite] = useState(false);

    const { user } = useAuth0();

    useEffect(() => {
        let id;
        let _id;
        if (user) {
            id = user.sub.split("|")
            _id = id[1];
        }
        
        // resets game to re-render the results loading
        setGame([]);

        // back end will fetch the data conditionally based on these booleans (to save time)
        fetch(`/search/${searchedTerm}/${steam}/${humble}/${gmg}/${gog}/${_id}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                const {results, isFavorite} = data;
                setFavorite(isFavorite);
                setGame(results);
            })
            .catch(err => {
                console.log(err);
            })
    }, [searchedTerm])

    return (<>
        {game.length ? <div>
            {/* search bar only displayed after loading */}
            <SearchBarPosition>
                <SearchBar />
            </SearchBarPosition>
            {/* displays results */}
            <Title>
                <TitleDisplay>
                    <span>Displaying results for: </span>
                    <span>"{searchedTerm}"</span>
                </TitleDisplay>

                {/* sets the favorite status */}
                {user && <div onClick={() => setFavorite(!favorite)}>
                    <FavoriteButton favorite={favorite} userInput={searchedTerm} steam={steam} humble={humble} gmg={gmg} gog={gog} />
                </div>}
            </Title>
            {/* renders the store information */}
            {game.map(store => {
                return <Container key={Math.random() * 10000000}>
                    <StoreInfo store={store} />
                </Container>
            })}
            <BackButton />
        </div> : 
        <>
        {/* displays loading screen */}
            <Title>
                <TitleDisplay>
                    <span>Loading results for: </span>
                    <span>"{searchedTerm}"</span>
                    <Spinner src={SpinnerSrc} alt="spinner" />
                </TitleDisplay>
            </Title>
        </>}
    </>)
}

const Spinner = styled.img `
    margin-top: 100px;
    margin-left: 100px;
    height: 300px;
`

const SearchBarPosition = styled.div `
    text-align: center;
    margin-top: 10px;
`

const TitleDisplay = styled.div `
    display: flex;
    flex-direction: column;
    text-align: center;
`

const Title = styled.h1 `
    display: flex;
    justify-content: center;
    margin: 10px auto;
    width: 700px;
    position: relative;
`

const Container = styled.div `
    display: flex;
    border: red solid 1px;
    width: 700px;
    margin: auto;
`

export default SearchResults
