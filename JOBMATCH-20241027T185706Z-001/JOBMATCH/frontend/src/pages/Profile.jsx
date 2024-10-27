import React, { useState, useLayoutEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import JobmatchLogo from '../assets/jobmatch-logo.png'

function Profile({ username, accountType, setIsLoggedIn, setPassword, setUsername }) {
    const [jobs, setJobs] = useState([])
    const [isChangingPassword, setIsChangingPassword] = useState()
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordAgain, setNewPasswordAgain] = useState('')

    const navigate = useNavigate()
    
    function handleShowMyJobs() {
        axios.get('http://localhost:8000/show-my-jobs', { params: { username: username } })
            .then(res => {
                console.log('Status Code:' , res.status)
                console.log('Data:', res.data)

                if (res.status === 200) {
                    setJobs(res.data.payload)
                }
            })
            .catch(err => {
                console.log('Error Status:', err.response.status)
                console.log('Error Data:', err.response.data)
            })
    }

    function handlePasswordChange() {
        if (newPassword !== newPasswordAgain) {
            return
        }

        axios.post('http://localhost:8000/change-password', { username: username, newPassword: newPassword })
            .then(res => {
                console.log('Status Code:' , res.status)
                console.log('Data:', res.data)
            })
            .catch(err => {
                console.log('Error Status:', err.response.status)
                console.log('Error Data:', err.response.data)
            })
    }

    function handleLogOut() {
        setPassword('')
        setUsername('')
        setIsLoggedIn(false)
    }

    useLayoutEffect(() => {
        handleShowMyJobs()
    }, [])

    return (
        <div className="flex flex-col w-full h-svh text-blue-950 overflow-hidden">
             <div className="grid grid-cols-12 center p-3 px-6 w-full min-h-24 border-b-4 bg-blue-100 border-blue-400">
                <div className="col-span-2 flex justify-start items-center h-full">
                    <img className="w-64" src={ JobmatchLogo } alt="" />
                </div>
                <div className="col-span-10 flex gap-3 justify-end items-center">
                    <Link to="/all-jobs" className="p-3 rounded-xl hover:bg-blue-300">ALL JOBS</Link>
                    {
                        accountType === "Company" &&
                        <Link to="/create-job" className="p-3 rounded-xl hover:bg-blue-300">CREATE JOB</Link>
                    }
                    <Link to="/my-jobs" className="p-3 rounded-xl bg-blue-400 hover:bg-blue-300">PROFILE</Link>
                </div>
            </div>
            <div className="flex flex-col p-9 gap-6 w-full h-full overflow-hidden">
                <div className="grid grid-cols-2 items-center">
                    <div>
                        <p className="text-5xl font-bold">Hi, { username }!</p>
                    </div>
                    <div className="flex gap-6 w-full justify-end">
                        <button className="p-3 rounded-xl bg-blue-300 hover:bg-blue-400" onClick={ () => { setIsChangingPassword(!isChangingPassword) } }>
                            Change Password
                        </button>
                        <Link to="/" className="p-3 rounded-xl bg-blue-300 hover:bg-blue-400" onClick={ () => { handleLogOut() } }>
                            Log Out
                        </Link>
                    </div>
                </div>
                {
                    isChangingPassword &&
                    <div className="flex w-full p-6 gap-6 justify-center items-center rounded-xl bg-blue-100">
                        <p className="text-xl font-bold">Change Password</p>
                        <input className={`${ newPassword !== newPasswordAgain ? "border-red-600" : "border-blue-300" } p-3 text-blue-950 placeholder-blue-400 border-2 rounded-xl bg-transparent caret-blue-300`} value={ newPassword } onChange={ e => setNewPassword(e.target.value) } type="password" placeholder="Password" />
                        <input className={`${ newPassword !== newPasswordAgain ? "border-red-600" : "border-blue-300" }  p-3 text-blue-950 placeholder-blue-400 border-2 border-blue-300 rounded-xl bg-transparent caret-blue-300`} value={ newPasswordAgain } onChange={ e => setNewPasswordAgain(e.target.value) } type="password" placeholder="Password Again" />
                        <button className="p-3 rounded-xl bg-blue-300 hover:bg-blue-400" onClick={ () => { handlePasswordChange() } }>
                            Confirm Change
                        </button>
                    </div>
                }
                {
                    accountType === "Company" &&
                    <>
                        <p className="text-xl font-bold">Your jobs</p>
                        <div className="p-1 w-full h-full border-2 rounded-xl border-blue-400 overflow-hidden">
                            <div className="flex flex-col w-full h-full p-3 gap-3 border-2 rounded-xl border-blue-400 overflow-y-scroll overflow-hidden scrollable-div">
                                {
                                    jobs &&
                                    jobs.length > 0 &&
                                    jobs.map((job, index) => 
                                        <div className="flex flex-col p-6 gap-6 w-full bg-blue-300 rounded-xl" key={ index }>
                                            <p className="text-xl font-bold">{ job.title }</p>
                                            <p className="text-lg">{ job.description }</p>
                                            <p className="w-full text-end">Job by { job.username }</p>
                                            <div className="flex">
                                                <div className="w-full">
                                                    <b>Salary: </b>{ job.salary }
                                                </div>
                                                <div className="w-full text-end font-semibold">
                                                    { job.email }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Profile