import React, {useReducer} from 'react'

import { url } from "./constants"

export const FavoriteContext = React.createContext();

const initialState = {
    favorites: [],
    status: "idle",
};

function reducer(state, action) {
    switch(action.type) {
        case "first-load": {
            return {
                ...state, 
                favorites: action.data,
            }
        }

        case "add-favorite": {
            return {
                ...state, 
                favorites: action.data,
            }
        }

        case "remove-favorite": {
            return {
                ...state, 
                favorites: action.data,
            }
        }

        case "loading": {
            return {
                ...state,
                status: "loading",
            }
        }

        case "idle": {
            return {
                ...state,
                status: "idle",
            }
        }

        default:
            throw new Error("Something broke")
    }
}

export const FavoriteProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const firstLoad = (_id) => {
        fetch(`${url}/get/${_id}`,{
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: "first-load",
                    data: data,
                })
            })
    }

    const addFavorite = (body) => {

        fetch(`${url}/add/favorite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(body),
        })
        .then(x =>  fetch(`${url}/get/${body._id}`,{
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
        })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: "add-favorite",
                        data: data,
                    })
                }))
    }

    const removeFavorite = (body) => {

        fetch(`${url}/remove/favorite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(body),
        })
        .then(x => fetch(`${url}/get/${body._id}`,{
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
        })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: "add-favorite",
                        data: data,
                    })
                }))
    }

    const setLoadingStatus = () => {
        dispatch({
            type: "loading",
        })
    }

    const setIdleStatus = () => {
        dispatch({
            type: "idle",
        })
    }

    return <FavoriteContext.Provider value={{state, actions: { firstLoad, addFavorite, removeFavorite, setLoadingStatus, setIdleStatus }}}>
        {children}
        </FavoriteContext.Provider>
}

export default FavoriteContext
