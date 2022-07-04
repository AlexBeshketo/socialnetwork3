

export type DialogsPropsType = {
    name: string,
    id: number
}

export type SideBarPageType = {
    names: Array<DialogsPropsType>,
    isTrue: boolean
}

let initialStateOfSideBar = {
    names: [
        {name: 'Sveta', id: 1},
        {name: 'Kolya', id: 2},
        {name: 'Masha', id: 3},
        {name: 'Natasha', id: 4}
    ],
    isTrue: true
}

type sidebarReducerActionType = ReturnType<typeof sidebarReducer>

export const sidebarReducer = (state: SideBarPageType = initialStateOfSideBar, action: any) => {

    return state

};

