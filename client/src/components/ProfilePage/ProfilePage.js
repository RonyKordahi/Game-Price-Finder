import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { useAuth0 } from "../auth0/auth0";

const ProfilePage = () => {
    const { user } = useAuth0();

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (user) {
            let _id;
            const id = user.sub.split("|")
            _id = id[1];
        
            fetch(`/get/${_id}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Accept" : "application/json"
                },
            })
                .then(res => res.json())
                .then(data => setFavorites(data))
        }
    }, [])

    return (
        <>
        {user && <Profile>
            <ProfilePic src={user.picture} alt="Profile" />

            <h1>Welcome to your profile page {user.given_name}!</h1>
            
            <h2>Your favorite searches</h2>
            {favorites.length ? 
            <>
                {favorites.map(result => {
                    return <>
                        <Link to={`/results/${result.userInput}/${result.steam}/${result.humble}/${result.gmg}/${result.gog}`}
                        key={Math.random() * 10000000}
                        className="hover">
                            {result.userInput}
                        </Link>
                    </>
                })}
            </> : 
            <div>No favorites yet!</div>}
        </Profile>}
        </>
    );
};

const Profile = styled.div `
    text-align: center;

    h1 {
        margin-bottom: 25px;
    }
`

const ProfilePic = styled.img `
    height: 350px;
    border-radius: 1000px;
    margin: 20px 0px;
`

export default ProfilePage;