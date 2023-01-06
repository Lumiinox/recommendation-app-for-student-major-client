import { ActionType } from '../action-types/index';
import { Action } from '../actions';

interface StateProps{
    name: string;
    currentId: number;
    email: string;
    status: number; 
    loginStatus: boolean;
    authToken: string;
}

const initialState = {
    name: "",
    currentId: 0,
    email: "",
    status: 0,
    loginStatus: false,
    authToken: "",
};

const reducer = (state: StateProps = initialState, action: Action) => {
    switch (action.type){
        case ActionType.UPDATE_ACC_DATA:
            return{
                name: action.payload.name,
                currentId: action.payload.currentId,
                email: action.payload.email,
                status: action.payload.status,
                authToken: action.payload.authToken,
                loginStatus: true,
            };
            
        case ActionType.REMOVE_ACC_DATA:
            return{
                name: "",
                currentId: 0,
                email: "",
                status: 0,
                loginStatus: false,
                authToken: "",
            }
        default:
            return state;
    }
}

export default reducer;