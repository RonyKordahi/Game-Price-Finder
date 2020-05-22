import React, {useState, useRef, useEffect} from 'react'
import { useHistory } from "react-router-dom"
import styled from "styled-components"

function SearchBar() {
    const [userInput, setUserInput] = useState("");
    const [filters, setFilters] = useState({Steam: true, Humble: true, GMG: true, GOG: true})

    const history = useHistory();

    const inputRef = useRef(null);

    useEffect(() => {
        // sets focus on the search bar
        inputRef.current.focus();
    }, [])

    return (<>
        <form onSubmit={(e) => {
            e.preventDefault();
            if (userInput.length){
                // redirects the app 
                if (!(filters.Steam) && !(filters.Humble) && !(filters.GMG) && !(filters.GOG)) {
                    history.push("/404");
                }
                else {
                    history.push(`/results/${userInput}/${filters.Steam}/${filters.Humble}/${filters.GMG}/${filters.GOG}`);
                }
            }
        }} >
            <StyledSearch placeholder="Enter game name here"
            ref={inputRef}
            onChange={(e) => setUserInput(e.target.value)} />
        </form>

        <Filterwrap>
            {/* displays the filters */}
            {Object.keys(filters).map(filter => {
                return <li key={Math.random() * 1000000} >
                    <StyledCheckBox type="checkbox" value={filter} checked={filters[filter]} onChange={(e) => {
                        const key = e.target.value;
                        setFilters({
                            ...filters,
                            [key]: !filters[key]
                        })
                    }} />
                    <label>{filter}</label>
                </li>
            })}
        </Filterwrap>         
    </>)
}

const StyledCheckBox = styled.input `
    margin-top: 10px;
    margin-left: 15px;
`

const StyledSearch = styled.input `
    width: 75%;
    margin-bottom: 5px;
    height: 25px;
    background: whitesmoke;
`

const Filterwrap = styled.div `
    display: flex;
    justify-content: center;
`

export default SearchBar
