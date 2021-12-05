import Actions from "../Actions";
interface IUser {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    id: string,
}

const INITIAL_STATE: {
    users: IUser[]
} = {
    users: [],
}

export var usersReducer = (state = INITIAL_STATE, action:any) => {
    let index = -1;
    let old = [];
    switch (action.type) {
        case Actions.SETUSERS:
            return {
                users: [...action.payload]
            }
        case Actions.EDITUSER:
            old = [...state.users];
            index = old?.findIndex(ele=>ele.id===action.payload.id);
            old[index] = {...action.payload};
            return {
                users: [...old]
            }
        case Actions.DELETEUSER:
            old = [...state.users];
            index = old?.findIndex(ele=>ele.id===action.payload.id);
            old.splice(index,1);
            return {
                users: [...old]
            };
        default:
            return state
    }
}