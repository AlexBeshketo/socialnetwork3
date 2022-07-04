import React from "react"
import ContentLoader from "react-content-loader"
import p from './ProfileInfo.module.css'

const Skeleton = (props:any) => (
    <div className={p.block}>
    <ContentLoader
        speed={2}
        width={500}
        height={215}
        viewBox="0 0 500 215"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="9" y="17" rx="63" ry="63" width="200" height="200" />
        <rect x="221" y="25" rx="16" ry="16" width="213" height="52" />
        <rect x="230" y="114" rx="0" ry="0" width="197" height="27" />
        <rect x="230" y="147" rx="0" ry="0" width="195" height="24" />
        <rect x="230" y="178" rx="0" ry="0" width="195" height="27" />
    </ContentLoader>
    </div>
)

export default Skeleton