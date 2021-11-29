import React from "react"
import Link from "next/link"

const LeftMenu = ({ isVisible }) => {

    return (
    <div className="block absolute w-48" >
        <div className="mt-4 rounded-tr-base rounded-tl-base bg-gray-50 px-4 py-4 w-full">
            <ul>
            <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><Link href="/Walk">Walk</Link></li>
            <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><Link href="/">Home</Link></li>
                <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><Link href="/Discover">Discover</Link></li>
                <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><Link href="/Options">Options</Link></li>    
            </ul>   
        </div>
    </div>)
}
export default LeftMenu