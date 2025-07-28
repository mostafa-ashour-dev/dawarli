"use client";
import "@/styles/navbars/_topNavbar.scss"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Btn from '../ui/Btn'

export default function TopNavbar() {

    const [route, setRoute] = useState(null);
   useEffect(() => {
     setRoute(window.location.pathname);
   }, [])


    return (
        <nav className='navbar'>

            <div className="navLeft">
                <Link className="logo" href="/">
                    <h1>Edu-Findr</h1>
                </Link>

                <ul>
                    <li>
                        <Link className="navLink" href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="navLink" href="/about">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link className="navLink" href="/team">
                            Team
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="navRight">
                <Btn link={"/"} text="Schools" active={route && route === "/" ? true : false} />
                <Btn link={"/teachers"} text="Teachers" active={route && route === "/teachers" ? true : false} />
            </div>


        </nav>
    )
}
