import React from 'react'
import { Link } from 'react-router-dom'

import JobmatchLogo from '../assets/jobmatch-logo.png'
import LandingLogo from '../assets/landing-logo.png'

function Landing({ setIsLoggingIn }) {
    return (
        <div className="flex flex-col w-full h-svh text-blue-950 overflow-hidden">
             <div className="grid grid-cols-12 center p-3 px-6 w-full min-h-24 border-b-4 bg-blue-100 border-blue-400">
                <div className="col-span-2 flex justify-start items-center h-full">
                    <img className="w-64" src={ JobmatchLogo } alt="" />
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="flex flex-col p-9 gap-6 w-full h-full items-center overflow-hidden">
                    <p className="text-9xl mt-20 text-center">Find Your Dream Job Today</p>
                    <p className="text-2xl mb-9 text-center">Explore thousands of opportunities tailored just for you.</p>
                    <button className="p-3 w-32 text-blue-50 text-center font-bold bg-blue-400 rounded-xl" onClick={ () => { setIsLoggingIn(true) } } >
                        Get Started
                    </button>
                </div>
                <div className="flex p-32 pt-28 pb-64 w-full h-svh justify-center items-center">
                    <img className="w-full" src={ LandingLogo } alt="" />
                </div>
            </div>
        </div>
    )
}

export default Landing