import React from 'react';

// type WaitingLogoPropsType = {
//     isFetching: boolean
// }

import ContentLoader from "react-content-loader"



export const WaitingLogo = (props:any) => (
    <ContentLoader
        speed={2}
        width={300}
        height={172}
        viewBox="0 0 300 172"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="121" rx="0" ry="0" width="156" height="52" />
        <rect x="230" y="178" rx="0" ry="0" width="195" height="27" />
        <circle cx="72" cy="68" r="45" />
    </ContentLoader>
)


