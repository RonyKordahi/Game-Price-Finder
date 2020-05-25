import React, { useEffect, useState, useContext } from 'react'
import { useParams, useLocation } from "react-router-dom"
import styled from "styled-components"
import { Link } from "react-router-dom"

import StoreInfo from '../StoreInfo/StoreInfo'
import { useAuth0 } from "../auth0/auth0"
import FavoriteButton from '../FavoriteButton'
import SearchBar from '../SearchBar/SearchBar'
import BackButton from '../BackButton'
import FavoriteContext from "../../FavoriteContext"
import { url } from "../../constants"

function SearchResults() {
    const {searchedTerm, steam, humble, gmg, gog} = useParams();
    
    const [game, setGame] = useState([]);
    const [favorite, setFavorite] = useState(false);
    const [links, setLinks] = useState([]);

    const {state, actions: {setLoadingStatus, setIdleStatus}} = useContext(FavoriteContext);

    const { user } = useAuth0();
    let location = useLocation();

    let slicedSearched;

    if (searchedTerm.length > 20) {
        slicedSearched = searchedTerm.slice(0, 20);
    }

    useEffect(() => {
        let id;
        let _id;
        if (user) {
            id = user.sub.split("|")
            _id = id[1];
        }
        
        // resets game to re-render the results loading
        setGame([]);

        // sets the state status to loading
        setLoadingStatus();

        // back end will fetch the data conditionally based on these booleans (to save time)
        fetch(`${url}/search/${searchedTerm}/${steam}/${humble}/${gmg}/${gog}/${_id}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                // sets state status to idle
                setIdleStatus();

                const {results, isFavorite, links} = data;
                setLinks(links);
                setFavorite(isFavorite);
                setGame(results);
            })
            .catch(err => {
                console.log(err);
            })
    }, [location])

    return (<>
        {state.status === "idle" ? <>
            {/* search bar only displayed after loading */}
            <SearchBarPosition>
                <SearchBar />
            </SearchBarPosition>
            {/* displays results */}
            <Title>
                <TitleDisplay>
                    <span>{`Displaying ${links != undefined ? links.length : ""} results for:`}</span>
                    <span>"{searchedTerm}"</span>
                </TitleDisplay>

                {/* sets the favorite status */}
                {user && links === undefined && <div onClick={() => setFavorite(!favorite)}>
                    <FavoriteButton favorite={favorite} userInput={searchedTerm} steam={steam} humble={humble} gmg={gmg} gog={gog} />
                </div>}
            </Title>
            {/* renders the store information */}
            {game && 
            <> {game.map((store, index) => {
                return <Container key={Math.random() * 10000000} className={index === (game.length - 1) && "last"} >
                    <StoreInfo store={store} />
                </Container>
            })}
            </>}
            {links && 
            <LinkWrapper> 
                {links.map(appName => {
                    return <>
                        <h2 key={Math.random() * 10000000}>
                            <Link className="hover" to={state.status === "idle" && `/results/${appName}/${steam}/${humble}/${gmg}/${gog}`}> 
                                {appName}
                            </Link>
                        </h2>
                    </>
                })}
            </LinkWrapper>}
            <BackButton />
        </> : 
        <>
        {/* displays loading screen */}
            <Title>
                <TitleDisplay>
                    <span>Loading results for: </span>
                    <span>"{slicedSearched || searchedTerm}{slicedSearched && "..."}"</span>
                    <StyledGif src="/assets/pacman.gif" alt="loading gif" />
                </TitleDisplay>
            </Title>
        </>}
    </>)
}

const LinkWrapper = styled.div `
    text-align: center;
    height: 450px;
    overflow-y: auto;
    
    h2 {
        margin: 17px;
    }
`

const StyledGif = styled.img `
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
    width: 578px;
    position: relative;
`

const Container = styled.div `
    display: flex;
    border: red solid 2px;
    border-bottom: none;
    width: 700px;
    margin: auto;
`

export default SearchResults
