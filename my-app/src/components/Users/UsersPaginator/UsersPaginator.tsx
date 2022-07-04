import React from 'react';
import {Pagination, Stack} from "@mui/material";


type UsersType = {

    pageSize: number,
    totalUsersCount: number,
    currentPage: number

    onPageChanged: (currentPage: number) => void

}
export type PostDeleteAxiosType = {
    resultCode: number
    messages: string[]
    data: {}

}


export const UsersPagination = ({totalUsersCount, pageSize, onPageChanged, currentPage}: UsersType) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        if (i>1200) {
            pages.push(i);
        }
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChanged(value);
    };

    const screenWidth = window.screen.width;

    return (
        <div>
            <Stack spacing={40}>
                <Pagination   count={pages.length} defaultPage={6} page={currentPage} onChange={handleChange}/>
            </Stack>

        </div>
    )
};


