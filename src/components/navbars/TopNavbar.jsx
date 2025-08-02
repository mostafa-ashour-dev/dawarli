"use client";
import "@/styles/navbars/_topNavbar.scss"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Btn from '../ui/Btn'
import { FaBars, FaSchool, FaUserCheck } from "react-icons/fa";


const navLinks = [
    {
        link: "/",
        text: "Home"
    },
    {
        link: "/about",
        text: "About"
    },
    {
        link: "/team",
        text: "Team"
    }
]

export default function TopNavbar() {

    const [route, setRoute] = useState(null);
    useEffect(() => {
        setRoute(window.location.pathname);
    }, []);
    const [show, setShow] = useState(false);

    const [active, toggleActive] = useState({
        btn1: true,
        btn2: false
    })

    useEffect(() => {
        if (route === "/") {
            toggleActive({
                btn1: true,
                btn2: false
            })
        } else if (route === "/teachers") {
            toggleActive({
                btn1: false,
                btn2: true
            })
        }
    }, [route]);
    


    return (
        <nav className={`navbar ${show && show ? "active" : ""}`}>

            <div className="navLeft">
                <button className="hamburger" onClick={() => {
                    setShow(!show);
                }}>
                    <FaBars />
                </button>
                <Link className="logo" href="/">
                    <img src="/imgs/dawarli.png" alt="logo" /> <div><h1>Dawarli</h1><p>Your compass to schools & tutors.</p></div> 
                </Link>

                <ul>


                    {
                        navLinks.map((link, index) => (
                            <li key={index} onClick={() => setShow(false)}>
                                <Link className="navLink" href={link.link}>
                                    {link.text}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className="navRight">
                <Btn link={"/"} text="Schools" icon={<FaSchool />} showIconOnSmallScreen={true} hideTextOnSmallScreen={true} active={active.btn1} onClick={() => {
                    toggleActive({
                        btn1: true,
                        btn2: false
                    })
                }} />
                <Btn link={"/teachers"} text="Teachers" icon={<FaUserCheck />} showIconOnSmallScreen={true} hideTextOnSmallScreen={true} active={active.btn2} onClick={() => {
                    toggleActive({
                        btn1: false,
                        btn2: true
                    })
                }} />
            </div>


        </nav>
    )
}
