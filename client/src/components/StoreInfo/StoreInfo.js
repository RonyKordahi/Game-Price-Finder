import React from 'react'
import styled from "styled-components"

import SteamSrc from "../../assets/Steam.png"
import HumbleSrc from "../../assets/Humble.svg"
import GMGSrc from "../../assets/GMG.png"
import GOGSrc from "../../assets/GOG.png"

function StoreInfo({store}) {

    switch (store.name) {
        case "Steam":
            store.logo = SteamSrc;
            store.logoUrl = "https://store.steampowered.com/";
            break;

        case "Humble":
            store.logo = HumbleSrc;
            store.logoUrl = "https://www.humblebundle.com/store";
            break;

        case "GMG":
            store.logo = GMGSrc;
            store.logoUrl = "https://www.greenmangaming.com/";
            break;

        case "GOG":
            store.logo = GOGSrc;
            store.logoUrl = "https://www.gog.com/";
            break;

        default: 
        console.log("NOPE");
        break;
    }

    return (<>
        {store.current != null ? <Store>
            <a href={store.logoUrl} target="_blank" rel="noopener noreferrer">
                <LogoPlacement className="hover"><Logo src={store.logo} alt="logo" /></LogoPlacement>
            </a>
            {store.current === store.full ? 
            <>
                <InfoWrapper>
                    <GameInfo>
                        <span>{store.full ? `Fully priced: ${store.full} $` : "Free!"}</span>
                    </GameInfo>
                    <GameInfo>
                        <a href={store.url} target="_blank" rel="noopener noreferrer"  className="hover">
                            Purchase
                        </a>
                    </GameInfo>
                </InfoWrapper>
            </> : 
            <>
                <InfoWrapper>
                    <GameInfo>
                        <span>Normally: {store.full} $ -</span>
                        <span> - Discount: {store.discount || (Math.round(100 - ((store.current / store.full) * 100)))} % - </span>
                        <span> - <span className="bold on-sale">Currently: {store.current} $</span></span>
                    </GameInfo>
                    <GameInfo>
                        <a href={store.url} target="_blank" rel="noopener noreferrer"  className="hover">
                            Purchase
                        </a>
                    </GameInfo>
                </InfoWrapper>
            </>}
        </Store> : 
        <Store>
            <a href={store.logoUrl} target="_blank" rel="noopener noreferrer">
                <LogoPlacement className="hover"><Logo src={store.logo} alt="logo" /></LogoPlacement>
            </a>
            <GameInfo>
                <span>- GAME NOT AVAIlABLE -</span>
            </GameInfo>
        </Store>}
    </>)
}

const LogoPlacement = styled.div `
    display: flex;
    justify-content: left;
`

const GameInfo = styled.div `
    display: flex;
    align-items: center;
    margin: auto;
    font-size: 18px;

    a {
        transform: translate(-10px ,20px);
    }

    span {
        transform: translateY(5px);
    }
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
