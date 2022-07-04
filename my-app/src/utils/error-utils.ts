import {ActionsAppType, setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import {Dispatch} from "redux";
import {setFollowingInProgress} from "../state/users-reducer";



// export const handleNetworkError= (dispatch:Dispatch<ActionsAppType>, error:AxiosError)=> {
//     dispatch(setAppErrorAC(error.message))
//     dispatch(setAppStatusAC('failed'))
// }

export const handleServerAppError = (dispatch:Dispatch<ActionsAppType> , data: any)=> {

    dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : "Some error occured"))
    dispatch(setAppStatusAC('failed'))
}

