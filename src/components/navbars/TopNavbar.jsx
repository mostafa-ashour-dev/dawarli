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

   const [active, toggleActive] = useState({
    btn1: true,
    btn2: false
   })


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
                <Btn link={"/"} text="Schools" active={active.btn1} onClick={() => {
                    toggleActive({
                        btn1: true,
                        btn2: false
                    })
                }} />
                <Btn link={"/teachers"} text="Teachers" active={active.btn2} onClick={() => {
                    toggleActive({
                        btn1: false,
                        btn2: true
                    })
                }} />
            </div>


        </nav>
    )
}
