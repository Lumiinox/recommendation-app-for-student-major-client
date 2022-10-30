import { Dispatch } from "react"
import { ActionType } from "../action-types"
import { Action } from "../actions"

export const updateProfileData = (nameIn: string, emailIn: string, statusIn: number, nimIn: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type:ActionType.UPDATE_ACC_DATA,
            payload:{
                name: nameIn,
                email: emailIn,
                status: statusIn,
                nim: nimIn
                }
            })
        }
    }

export const removeProfileData = () =>{
    return (dispatch: Dispatch<Action>) => {
        dispatch ({
            type:ActionType.REMOVE_ACC_DATA
        })
    }
}