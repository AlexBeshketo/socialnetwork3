export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


//status- loading? ktrutilku pokazivaem

// 'idle' |  'succeeded' | 'failed'  - krutilku priachem

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null
}

// TYPES //

type InitialStateType = {
    status: string,
    error: string | null
}
export type ActionsAppType = setAppStatusType | setAppErrorType
export type setAppStatusType = ReturnType<typeof setAppStatusAC>
export type setAppErrorType = ReturnType<typeof setAppErrorAC>

//    //

export const appReducer = (state: InitialStateType = initialState, action: ActionsAppType): InitialStateType => {


    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}

        default:
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}

export const setAppErrorAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

