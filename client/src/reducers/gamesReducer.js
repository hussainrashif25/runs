import {
  CREATE_GAME,
  UPDATE_GAME,
  DELETE_GAME,
  GET_GAME,
  GAME_LOADING,
  GET_GAMES,
  GAMES_LOADING
} from "../actions/types";

const initialState = {
  games: [],
  game: [],
  gameLoading: false,
  gamesLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_GAME:
      return {
        ...state,
        games: [action.payload, ...state.games]
      };
    case UPDATE_GAME:
      let index = state.games.findIndex(
        game => game._id === action.payload._id
      );

      state.games.splice(index, 1);

      return {
        ...state,
        games: [action.payload, ...state.games]
      };
    case DELETE_GAME:
      return {
        ...state,
        games: state.games.filter(
          game => game._id !== action.payload
        )
      };
    case GET_GAME:
      return {
        ...state,
        game: action.payload,
        gameLoading: false
      };
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
        gamesLoading: false
      };
    case GAME_LOADING:
      return {
        ...state,
        gameLoading: true
      };
    case GAMES_LOADING:
      return {
        ...state,
        gamesLoading: true
      };
    default:
      return state;
  }
}
