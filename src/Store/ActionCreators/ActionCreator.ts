import Actions from "../Actions";

interface IUsers {
    users: IUser[]
}

interface IUser{
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    id: string,
}

export interface ILogin {
    name: string,
    token: string
}

export const LOGIN = ({name,token}:ILogin)=>{
    return{
        type: Actions.LOGIN,
        payload: {
            name,
            token
        }
    }
}

export const LOGOUT = ()=>{
    return {
        type: Actions.LOGOUT
    }
}

export const SETUSERS = ({users}:IUsers)=>{
    return {
        type: Actions.SETUSERS,
        payload: {
            users: [...users]
        }
    }
}

export const EDITUSERS = ({firstName,id,lastName,dateOfBirth}:IUser)=>{
    return {
        type: Actions.SETUSERS,
        payload: {
            firstName,id,lastName,dateOfBirth
        }
    }
}

export const DELETEUSER = (id: string)=>{
    return{
        type: Actions.DELETEUSER,
        payload: { 
            id
        }
    }
}