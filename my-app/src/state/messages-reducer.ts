import {v1} from "uuid";
import {Config, names, uniqueNamesGenerator} from "unique-names-generator";


export type DialogsPageType = {
    // users: Array<DialogsPropsType>,
    messages: Array<MessagesPropsType>,

}
export type DialogsPropsType = {
    name: string,
    id: number
}
export type MessagesPropsType = {
    user: string
    message: string,
    id: string,
}

const config: Config = { /// randomName
    dictionaries: [names]
}
const characterName: string = uniqueNamesGenerator(config); // Winona


let initialStateOfDialogsPage = {
    // users: [
    //     {name: 'Sveta', id: 1},
    //     {name: 'Kolya', id: 2},
    //     {name: 'Masha', id: 3},
    //     {name: 'Natasha', id: 4},
    // ],
    messages: [
        {user: 'Sveta', message: 'Hi , how are you ?', id: v1()},
        {user: 'Kolya', message: 'What is the weather today?', id: v1()},
        {user: 'Masha', message: 'Common, guy', id: v1()},
        {user: 'Natasha', message: 'Are you nigger?', id: v1()}
    ],

}

export const messagesReducer = (state: DialogsPageType = initialStateOfDialogsPage, action: messagesReducerActionsType): DialogsPageType => {


    switch (action.type) {

        case "ADD-NEW-MESSAGE":
            let text = action.newMessageBody;

            return {
                ...state,
                messages: [...state.messages, {user: uniqueNamesGenerator(config), message: text ,  id: v1()}]
            };

        default:
            return state

    }
};

export type messagesReducerActionsType = addNewMessageACType
type addNewMessageACType = ReturnType<typeof addNewMessage>


export const addNewMessage = (newMessageBody: string) => {
    return {
        type: 'ADD-NEW-MESSAGE',
        newMessageBody,
    } as const
}


