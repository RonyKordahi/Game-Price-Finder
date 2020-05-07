import React, {useReducer} from 'react'

export const FavoriteContext = React.createContext();

const initialState = [];

function reducer(state, action) {
    switch(action.type) {
        case "first-load": {
            return action.data;
        }

        case "add-favorite": {
            return action.data;
        }

        case "remove-favorite": {
            return action.data;
        }

        default:
            throw new Error("Something broke")
    }
}

export const FavoriteProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const firstLoad = (_id) => {
        fetch(`/get/${_id}`,{
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

        fetch("/add/favorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(body),
        })
        .then(x =>  fetch(`/get/${body._id}`,{
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

        fetch("/remove/favorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(body),
        })
        .then(x => fetch(`/get/${body._id}`,{
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

    return <FavoriteContext.Provider value={{state, actions: { firstLoad, addFavorite, removeFavorite }}}>
        {children}
        </FavoriteContext.Provider>
}

export default FavoriteContext
