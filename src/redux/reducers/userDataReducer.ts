import { ActionType } from '../action-types/index';
import { Action } from '../actions';

interface StateProps{
    name: string;
    nim: string;
    email: string;
    status: string; 
    loginStatus: boolean;
}

const initialState = {
    name: "",
    nim: "",
    email: "",
    status: "",
    loginStatus: false,
};

const reducer = (state: StateProps = initialState, action: Action) => {
    switch (action.type){
        case ActionType.UPDATE_ACC_DATA:
            return{
                name: action.payload.name,
                nim: action.payload.nim,
                email: action.payload.email,
                status: action.payload.status,
                loginStatus: true,
            };
            
        case ActionType.REMOVE_ACC_DATA:
            return{
                name: "",
                nim: "",
                email: "",
                status: "",
                loginStatus: false,
            }
        default:
            return state;
    }
}

export default reducer;