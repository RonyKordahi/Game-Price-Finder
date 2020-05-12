import React from 'react'
import styled from "styled-components"

function StoreInfo({store}) {

    // sets the logo and store URL based on the store's name
    switch (store.name) {
        case "Steam":
            store.logo = "/assets/Steam.png";
            store.logoUrl = "https://store.steampowered.com/";
            break;

        case "Humble":
            store.logo = "/assets/Humble.svg";
            store.logoUrl = "https://www.humblebundle.com/store";
            break;

        case "GMG":
            store.logo = "/assets/GMG.png";
            store.logoUrl = "https://www.greenmangaming.com/";
            break;

        case "GOG":
            store.logo = "/assets/GOG.png";
            store.logoUrl = "https://www.gog.com/";
            break;

        default: 
            console.log("Error");
            break;
    }

    // calculates the store discount
    const discount = (Math.round(100 - ((store.current / store.full) * 100)))
    
    return (<>
        {store.current != null ? <Store>
            {/* renders the game information based on the store */}
            <a href={store.logoUrl} target="_blank" rel="noopener noreferrer">
                <LogoPlacement className="hover"><Logo src={store.logo} alt="logo" /></LogoPlacement>
            </a>
            {store.current === store.full ? 
            <>
                {/* conditional render if the game is free */}
                <InfoWrapper>
                    <GameInfo>
                        <span>{store.full ? `Fully priced: ${store.full} $` : "Free!"}</span>
                    </GameInfo>
                    <a href={store.url} target="_blank" rel="noopener noreferrer"  className="hover" style={{"marginTop": "43px"}}>
                        Purchase
                    </a>
                </InfoWrapper>
            </> : 
            <>
                {/* renders the game's information */}
                <InfoWrapper>
                    <GameInfo>
                        <span className="full-price">Normally: {store.full} $</span>
                        <span>Currently: {store.current} $</span>
                    </GameInfo>
                    <a href={store.url} target="_blank" rel="noopener noreferrer"  className="hover" style={{"marginTop": "20px"}}>
                        Purchase
                    </a>
                </InfoWrapper>
                <Discount className="bold burst-12" discount={discount}>{store.discount || discount}%</Discount>
            </>}
        </Store> : 
        // if the store object is null, the game has not been found
        <Store>
            <a href={store.logoUrl} target="_blank" rel="noopener noreferrer">
                <LogoPlacement className="hover"><Logo src={store.logo} alt="logo" /></LogoPlacement>
            </a>
            <InfoWrapper>
                <span>- GAME NOT AVAILABLE -</span>
            </InfoWrapper>
        </Store>}
    </>)
}

const Discount = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    color: black;
    background: #f76a3b;
    background: ${props => props.discount >= 25 && "yellow"};
    background: ${props => props.discount >= 50 && "limegreen"};
    border-radius: 100px;
    height: 37px;
    width: 37px;
`

const LogoPlacement = styled.div `
    display: flex;
    justify-content: left;
`

const GameInfo = styled.div `
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: auto;
    font-size: 18px;
`
const InfoWrapper = styled(GameInfo) `
    display: flex;
    flex-direction: column;
`

const Logo = styled.img `
    height: 100px;
`

const Store = styled.div `
    display: flex;
    width: 100%;
    position: relative;
    margin: 3px;
`

export default StoreInfo
