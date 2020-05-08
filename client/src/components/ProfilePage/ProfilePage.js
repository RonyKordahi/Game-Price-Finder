import React, { useContext } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { useAuth0 } from "../auth0/auth0";
import FavoriteContext from "../../FavoriteContext"

const ProfilePage = () => {
    const { user } = useAuth0();

    const { state } = useContext(FavoriteContext);

    return (
        <>
        {user && <Profile>
            <h1>Welcome to your profile page {user.given_name}!</h1>
            <ProfilePic src={user.picture} alt="Profile" />
            <h2>Your favorite searches :</h2>

            {/* conditional rendering of the user's favorites */}
            {state.favorites.length ? 
            <>
            <GameWrap>
                {state.favorites.map(result => {
                    return <FavoriteGame to={`/results/${result.userInput}/${result.steam}/${result.humble}/${result.gmg}/${result.gog}`}
                        key={Math.random() * 10000000}
                        className="hover">
                            {result.userInput}
                        </FavoriteGame>
                })}
            </GameWrap>
            </> : 
            <div>You have no favorites yet!</div>}
        </Profile>}
        </>
    );
};

const FavoriteGame = styled(Link) `
    margin-left: 5px;
    margin-bottom: 5px;
`

const GameWrap = styled.div `
    display: flex;
    flex-wrap: wrap;
    width: 500px;
    justify-content: center;
    margin: auto;
`

const Profile = styled.div `
    text-align: center;

    h1, h2 {
        margin-top: 20px;
        margin-bottom: 15px;
    }
`

const ProfilePic = styled.img `
    height: 300px;
    border-radius: 1000px;
    margin: 20px 0px;
`

export default ProfilePage;