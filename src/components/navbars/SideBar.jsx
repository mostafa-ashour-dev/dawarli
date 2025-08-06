"use client";


import { cities, educationTypes, stages, subjects } from "@/constants/filtersOptions";
import "@/styles/navbars/_sideBar.scss"
import { useState } from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";

export default function SideBar({ headerText, headerIcon, showFilters, handleShowFilters, page, changeHandler, overview }) {


    const [show, setShow] = useState(false);

    function handleClickChange(type) {
        if (type === "plus" && overview < 5) {
            changeHandler({ target: { name: "overview", value: overview + 0.5 } });
        } else if (type === "minus" && overview > 0) {
            changeHandler({ target: { name: "overview", value: overview - 0.5 } });
        }

    }


    return (
        <aside className={`sidebar ${showFilters ? "active" : ""}`}>

            <button className="closeBtn" onClick={handleShowFilters}><FaTimes /></button>

            <header className="">
                {headerIcon}
                <h2>{headerText}</h2>
            </header>

            <div className="sidebarFields">
                {page && page !== "teachers" ? (
                    <div className="filtersContainer">
                        <div className="filterField">
                            <label htmlFor="city">City</label>
                            <select name="city" defaultValue="all" onChange={(e) => {
                                changeHandler(e);
                                handleShowFilters();
                            }} id="city">
                                <option value="all">All</option>
                                {
                                    cities.map((city, index) => (
                                        <option key={index} value={city}>{city}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="filterField">
                            <label htmlFor="type">Education Type</label>
                            <select name="type" defaultValue="all" onChange={(e) => {
                                changeHandler(e);
                                handleShowFilters();
                            }} id="type">
                                <option value="all">All</option>
                                {
                                    educationTypes.map((educationType, index) => (
                                        <option key={index} value={educationType}>{educationType}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="filterField">
                            <label htmlFor="overview">Rating</label>
                            <div className="overviewField">
                                <button className="minusBtn" onClick={() => handleClickChange("minus")}><FaMinus /></button>
                                <input type="text" min={0} max={5} maxLength={1} value={overview} onChange={(e) => {
                                    changeHandler(e);
                                    handleShowFilters();
                                }} />
                                <button className="plusBtn" onClick={() => handleClickChange("plus")}><FaPlus /></button>
                            </div>
                        </div>
                    </div>
                ) : (<div className="filtersContainer">

                        <div className="filterField">
                            <label htmlFor="subject">Subject</label>
                            <select name="subject" defaultValue="all" onChange={(e) => {
                                changeHandler(e);
                                handleShowFilters();
                            }} id="subject">
                                <option value="all">All</option>
                                {
                                    subjects.map((subject, index) => (
                                        <option key={index} value={subject}>{subject}</option>
                                    ))
                                }
                            </select>
                        </div>

                    <div className="filterField">
                        <label htmlFor="type">Education Type</label>
                            <select name="type" defaultValue="all" onChange={(e) => {
                                changeHandler(e);
                                handleShowFilters();
                            }} id="type">
                            <option value="all">All</option>
                            {
                                educationTypes.map((educationType, index) => (
                                    <option key={index} value={educationType}>{educationType}</option>
                                ))
                            }
                        </select>
                    </div>



                        <div className="filterField">
                            <label htmlFor="stagesTaught">Grades</label>
                            <select name="stagesTaught" defaultValue="all" onChange={(e) => {
                                changeHandler(e);
                                handleShowFilters();
                            }} id="stagesTaught">
                                <option value="all">All</option>
                                {
                                    stages.map((stage, index) => (
                                        <option key={index} value={stage}>{stage}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="filterField">
                            <label htmlFor="city">City </label>
                            <select name="city" defaultValue="all" onChange={(e) => {
                                changeHandler(e);
                                handleShowFilters();
                            }} id="city">
                                <option value="all">All</option>
                                {
                                    cities.map((stage, index) => (
                                        <option key={index} value={stage}>{stage}</option>
                                    ))
                                }
                            </select>
                        </div>
                </div>)
                }
            </div>
        </aside>
    )
}