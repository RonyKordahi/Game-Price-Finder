import React, {useState} from 'react'
import { useHistory } from "react-router-dom"

function Homepage() {

    const [userInput, setUserInput] = useState("");
    const [filters, setFilters] = useState({Steam: true, Humble: true, GMG: true, GOG: true})

    const history = useHistory();

    return (<>
        <form onSubmit={(e) => {
            e.preventDefault();
            if (userInput.length){
                // ugly but necessary
                history.push(`/results/${userInput}/${filters.Steam}/${filters.Humble}/${filters.GMG}/${filters.GOG}`);
            }
        }} >
            <input placeholder="search here"
            onChange={(e) => setUserInput(e.target.value)} />
        </form>
        {Object.keys(filters).map(filter => {
            return <li key={Math.random() * 1000000} >
                <input type="checkbox" value={filter} checked={filters[filter]} onChange={(e) => {
                    const key = e.target.value;
                    setFilters({
                        ...filters,
                        [key]: !filters[key]
                    })
                }} />
                <label>{filter}</label>
            </li>
        })}
    </>)
}

export default Homepage
