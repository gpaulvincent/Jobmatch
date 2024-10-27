import React, { useState, useLayoutEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import JobmatchLogo from '../assets/jobmatch-logo.png'

function MyJobs({ username, accountType }) {
    const [jobs, setJobs] = useState([])
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

    useLayoutEffect(() => {
        handleShowMyJobs()
    }, [])

    if (accountType === "Applicant") {
        navigate('/all-jobs')
        return
    }

    return (
        <div className="flex flex-col w-full h-svh text-blue-950 overflow-hidden">
             <div className="grid grid-cols-12 center p-3 px-6 w-full min-h-24 border-b-4 bg-blue-100 border-blue-400">
                <div className="col-span-2 flex justify-start items-center h-full">
                    <img className="w-64" src={ JobmatchLogo } alt="" />
                </div>
                <div className="col-span-10 flex gap-3 justify-end items-center">
                    <Link to="/all-jobs" className="p-3 rounded-xl hover:bg-blue-300">ALL JOBS</Link>
                    <Link to="/my-jobs" className="p-3 rounded-xl bg-blue-400 hover:bg-blue-300">MY JOBS</Link>
                    {
                        accountType === "Company" &&
                        <Link to="/create-job" className="p-3 rounded-xl hover:bg-blue-300">CREATE JOB</Link>
                    }
                </div>
            </div>
            <div className="flex flex-col p-6 gap-6 w-full h-full overflow-hidden">
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
            </div>
        </div>
    )
}

export default MyJobs