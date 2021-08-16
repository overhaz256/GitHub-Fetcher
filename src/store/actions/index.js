export const GET_FAVORITES = 'GET_FAVORITES';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const DELETE_FROM_FAVORITES = 'DELETE_FROM_FAVORITES';
export const RE_USER_STATE = 'RE_USER_STATE';
//Obtener el estado "Favorito"
export function GETFavoriteState() {
    const action = {
        type: GET_FAVORITES
    }
    return action;
}

//Agregar datos a nuestra lista de favoritos
export function AddToFavorite(item) {
    const action = {
        type: ADD_TO_FAVORITES,
        payload: item
    }
    return action;
}

//Eliminar de nuestra lista
export function DelFromFavorite(item) {
    const action = {
        type: DELETE_FROM_FAVORITES,
        payload: item
    }
    return action;
}

//Re user state
export function ReUserState(authSTATE){
    const action = {
        type: RE_USER_STATE,
        payload: authSTATE
    }
        return action;
}