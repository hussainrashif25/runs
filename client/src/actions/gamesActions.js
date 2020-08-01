import axios from "axios";

import {
    CREATE_GAME,
    UPDATE_GAME,
    DELETE_GAME,
    GET_GAME,
    GAME_LOADING,
    GET_GAMES,
    GAMES_LOADING
} from "./types";

//Create Game
export const createGame = gameData => dispatch => {
    axios
        .post("/api/games/create", gameData)
        .then(res =>
            dispatch({
                type: CREATE_GAME,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
};

//Update Game
export const updateGame = gameData => dispatch => {
    axios
    .patch("/api/games/update", gameData)
    .then(res =>
        dispatch({
            type: UPDATE_GAME,
            payload: res.data
        })
    )
    .catch(err => console.log(err));
};

//Delete Game
export const deleteGame = (id, history) => dispatch => {
    axios
        .delete('/api/games/delete/${id}')
        .then(res =>
            dispatch({
                type: DELETE_GAME,
                payload: id
            })
        )
        .then(res => history.push('/dashboard'))
        .catch(err => console.log(err));
};

//Get specific game by id
export const getGame = id => dispatch => {
    dispatch(setGameLoading());
    axios
        .get('/api/games/${id}')
        .then(res =>
            dispatch({
                type: GET_GAME,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_GAME,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_GAME,
                payload: null
            })
        );
};

//Get all projects for specific user
export const getGames = () => dispatch => {
    dispatch(setGamesLoading());
    axios
        .get("/api/games")
        .then(res =>
            dispatch({
                type: GET_GAMES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_GAMES,
                payload: null
            })
        );
};

//Game loading
export const setGameLoading = () => {
    return {
        type: GAME_LOADING
    };
};

//Games loading
export const setGamesLoading = () => {
    return {
        type: GAMES_LOADING
    };
};