import Actions from "../Actions";

const INITIAL_STATE = {
    name: null,
    token: null,
}

export var authReducer = (state = INITIAL_STATE, action:any) => {
    switch (action.type) {
        case Actions.LOGIN:
            const { name,token } = action.payload;
            console.log(name,token);
            localStorage.setItem('userapp',JSON.stringify({
                name,token
            }));
            return {
                name,
                token
            }
        case Actions.LOGOUT:
            return {
                ...INITIAL_STATE
            }
        default:
            return state
    }
}