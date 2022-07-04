import React from "react";

export const requiredField = (value: any) => {
    if (value) {
        return undefined
    } else {
        return 'Field is required'
    }
}

export const maxLengthCreator = (maxLength:number) => (value: any) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`
    return undefined
}

// export const maxLength30 = (value: any, maxValue: number) => {
//     if (value && value.length > 30) {
//         return 'Max length is 30 symbols'
//     } else {
//         return undefined
//     }
// }