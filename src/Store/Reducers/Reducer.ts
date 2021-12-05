import Actions from "../Actions";

const INITIAL_STATE = {
    name: null,
    token: null,
    dob: null
}

export var authReducer = (state = INITIAL_STATE, action:any) => {
    switch (action.type) {
        case Actions.LOGIN:
            const { name,token,dob } = action.payload;
            localStorage.setItem('userapp',JSON.stringify({
                name,token,dob
            }));
            return {
                name,
                token,
                dob
            }
        case Actions.LOGOUT:
            localStorage.removeItem('userapp');
            return {
                ...INITIAL_STATE
            }
        default:
            return state
    }
}