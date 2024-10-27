import React, { useState, useEffect } from 'react'
import axios from 'axios'

import JobmatchLogo from '../assets/jobmatch-logo.png'

function Auth({ 
        username, setUsername, password, setPassword, setIsLoggedIn, accountType, setAccountType
    }) {
    const [isLoggingIn, setIsLoggingIn] = useState(true)
    const [isCredsWrong, setIsCredsWrong] = useState(false)
    const [passwordAgain, setPasswordAgain] = useState('')

    function handleCreateAccount() {
        if (!username || !password || !accountType) {
            return
        }

        if (password !== passwordAgain) {
            return
        }

        setIsCredsWrong(false)

        axios.post('http://localhost:8000/create-account', { username: username, password: password, accountType: accountType })
            .then(res => {
                console.log('Status Code:' , res.status)
                console.log('Data:', res.data)

                if (res.status === 201) {
                    setIsLoggedIn(true)
                } else if (res.status === 202) {
                    setIsCredsWrong(true)
                } 
            })
            .catch(err => {
                console.log('Error Status:', err.response.status)
                console.log('Error Data:', err.response.data)
            })
    }

    function handleLogIn() {
        setIsCredsWrong(false)
        axios.get('http://localhost:8000/log-in', { params: { username: username, password: password } })
            .then(res => {
                console.log('Status Code:' , res.status)
                console.log('Data:', res.data)

                if (res.status === 200) {
                    setIsLoggedIn(true)
                    setAccountType(res.data.payload.accountType)
                } else if (res.status === 202) {
                    setIsCredsWrong(true)
                } 
            })
            .catch(err => {
                console.log('Error Status:', err.response.status)
                console.log('Error Data:', err.response.data)
            })
    }

    useEffect(() => {
        setIsCredsWrong(false)
    }, [isLoggingIn])

    return (
        <div className="flex flex-col items-center justify-center h-svh w-full bg-blue-100 ">
            <p className="mb-6 ml-1 text-blue-950 text-2xl font-bold">
                {
                    isLoggingIn ?
                    "Log In"
                    :
                    "Sign Up"
                }
            </p>
            <div className="flex flex-col gap-3 bg-blue-50 rounded-xl p-6">
                <div className="flex justify-center w-full">
                    <img className="w-96" src={ JobmatchLogo } alt="" />
                </div>
                {
                    isLoggingIn ?
                    isCredsWrong ?
                    <>
                        <p className="mt-4 text-red-600">
                            Incorrect username or password
                        </p>
                        <input className="p-3 text-blue-950 placeholder-blue-400 border-2 border-red-500 rounded-xl bg-transparent caret-blue-300" value={ username } onChange={ e => setUsername(e.target.value) } placeholder="Username" />
                        <input className="p-3 text-blue-950 placeholder-blue-400 border-2 border-red-500 rounded-xl bg-transparent caret-blue-300" value={ password } onChange={ e => setPassword(e.target.value) } type="password" placeholder="Password" />
                    </>
                    :
                    <>
                        <input className="p-3 mt-9 text-blue-950 placeholder-blue-400 border-2 border-blue-300 rounded-xl bg-transparent caret-blue-300" value={ username } onChange={ e => setUsername(e.target.value) } placeholder="Username" />
                        <input className="p-3 text-blue-950 placeholder-blue-400 border-2 border-blue-300 rounded-xl bg-transparent caret-blue-300"  value={ password } onChange={ e => setPassword(e.target.value) } type="password" placeholder="Password" />
                    </>
                    :
                    isCredsWrong ?
                    <>
                        <p className="mt-4 text-red-600">
                            Username already exists
                        </p>
                        <input className="p-3 text-blue-950 placeholder-blue-400 border-2 border-red-500 rounded-xl bg-transparent caret-blue-300" value={ username } onChange={ e => setUsername(e.target.value) } placeholder="Username" />
                        <input className="p-3 text-blue-950 placeholder-blue-400 border-2 border-red-500 rounded-xl bg-transparent caret-blue-300" value={ password } onChange={ e => setPassword(e.target.value) } type="password" placeholder="Password" />
                        <input className={`${ password !== passwordAgain ? "border-red-600" : "border-blue-300" } p-3 text-blue-950 placeholder-blue-400 border-2 rounded-xl bg-transparent caret-blue-300`} value={ passwordAgain } onChange={ e => setPasswordAgain(e.target.value) } type="password" placeholder="Password Again" />
                    </>
                    :
                    <>
                        <input className="p-3 mt-9 text-blue-950 placeholder-blue-400 border-2 border-blue-300 rounded-xl bg-transparent caret-blue-300" value={ username } onChange={ e => setUsername(e.target.value) } placeholder="Username" />
                        <input className={`${ password !== passwordAgain ? "border-red-600" : "border-blue-300" } p-3 text-blue-950 placeholder-blue-400 border-2 rounded-xl bg-transparent caret-blue-300`} value={ password } onChange={ e => setPassword(e.target.value) } type="password" placeholder="Password" />
                        <input className={`${ password !== passwordAgain ? "border-red-600" : "border-blue-300" } p-3 text-blue-950 placeholder-blue-400 border-2 rounded-xl bg-transparent caret-blue-300`} value={ passwordAgain } onChange={ e => setPasswordAgain(e.target.value) } type="password" placeholder="Password Again" />
                    </>
                }
                {
                    isLoggingIn ?
                    <>
                        <button className="p-3 mt-9 text-blue-50 font-bold bg-blue-400 rounded-xl hover:bg-blue-300" onClick={ () => { handleLogIn() } }>Log In</button>
                        <button className="p-3 text-blue-300 font-bold border-2 border-blue-400 rounded-xl" onClick={ () => {  setIsLoggingIn(false) } }>Sign Up</button>
                    </>
                    :
                    <>
                        <div className="flex p-3 gap-6 items-center">
                            <p className="text-xl text-blue-950 font-semibold">Account for?</p>
                            <button className={`${ accountType === "Applicant" && "bg-blue-400" } p- py-2 w-28 bg-blue-100 text-blue-950 font-semibold rounded-3xl hover:bg-blue-400`} onClick={ () => { setAccountType("Applicant") } }>Applicant</button>
                            <button className={`${ accountType === "Company" && "bg-blue-400" } p- py-2 w-28 bg-blue-100 text-blue-950 font-semibold rounded-3xl hover:bg-blue-400`} onClick={ () => { setAccountType("Company") } }>Company</button>
                        </div>
                        <button className="p-3 text-blue-50 font-bold bg-blue-400 rounded-xl hover:bg-blue-300" onClick={ () => { handleCreateAccount() } }>Create Account</button>
                        <button className="p-3 text-blue-300 font-bold border-2 border-blue-400 rounded-xl" onClick={ () => { setIsLoggingIn(true) } }>Already have an account? Log In Instead</button>
                    </>
                }
            </div>
        </div>
    )
}

export default Auth