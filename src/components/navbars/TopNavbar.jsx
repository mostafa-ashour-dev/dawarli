"use client";
import "@/styles/navbars/_topNavbar.scss"
import Link from 'next/link'
import React, { useEffect, useState, useTransition } from 'react'
import Btn from '../ui/Btn'
import { FaBars, FaSchool, FaUserCheck } from "react-icons/fa";
import Loader from "../ui/Loader";


const navLinks = [
    {
        link: "/",
        text: "Home"
    },
    {
        link: "/about",
        text: "About"
    },
    // {
    //     link: "/team",
    //     text: "Team"
    // }
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
    });

     const [isRouting, startTransition] = useTransition();
    
        function handleStartTransition() {
            startTransition(() => {
                return null
            });
        }

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

            {isRouting && <Loader />}

            <div className="navLeft">
                <button className="hamburger" onClick={() => {
                    setShow(!show);
                }}>
                    <FaBars />
                </button>
                <Link className="logo" href="/">
                    <div className="logoImage"></div> <div><h1>Dawarli</h1><p>Your compass to schools & tutors.</p></div> 
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
                <Btn link={"/"} text="Schools" icon={<FaSchool />} showIconOnSmallScreen={false} hideTextOnSmallScreen={true} active={active.btn1} onClick={() => {
                    toggleActive({
                        btn1: true,
                        btn2: false
                    });
                    handleStartTransition();

                }} />
                <Btn link={"/teachers"} text="Teachers" icon={<FaUserCheck />} showIconOnSmallScreen={false} hideTextOnSmallScreen={true} active={active.btn2} onClick={() => {
                    toggleActive({
                        btn1: false,
                        btn2: true
                    });
                    handleStartTransition();
                }} />
            </div>


        </nav>
    )
}
