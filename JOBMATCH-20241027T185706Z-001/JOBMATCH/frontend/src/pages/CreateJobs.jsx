import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import JobmatchLogo from '../assets/jobmatch-logo.png'

function CreateJobs({ username, accountType }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [salary, setSalary] = useState('')
    const [email, setEmail] = useState('')
    
    const navigate = useNavigate()
    
    function handleCreateJob() {
        axios.post('http://localhost:8000/create-job', { 
                username: username, title: title, description: description,
                salary: salary, email: email
            })
            .then(res => {
                console.log('Status Code:' , res.status)
                console.log('Data:', res.data)

                if (res.status === 201) {
                    navigate('/all-jobs')
                }
            })
            .catch(err => {
                console.log('Error Status:', err.response.status)
                console.log('Error Data:', err.response.data)
            })
    }

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
                    <Link to="/create-job" className="p-3 rounded-xl bg-blue-400 hover:bg-blue-300">CREATE JOB</Link>
                    <Link to="/profile" className="p-3 rounded-xl hover:bg-blue-300">PROFILE</Link>
                </div>
            </div>
            <div className="w-full h-full overflow-y-scroll">
                <div className="flex flex-col gap-12 p-9">
                    <div className="flex flex-col w-full gap-3">
                        <p className="text-2xl font-bold">Job Title:</p>
                        <input 
                            className="p-3 text-blue-950 placeholder-blue-300 border-2 border-blue-300 rounded-xl bg-transparent caret-blue-300" 
                            placeholder="Username" value={ title } onChange={ e => { setTitle(e.target.value) } } 
                        />
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <p className="text-2xl font-bold">Job Description:</p>
                        <textarea 
                            className="p-3 w-full border-2 border-blue-300 placeholder-blue-300 rounded-xl"
                            maxLength={ 500 } placeholder="Enter your description" rows={ 5 }
                            value={ description } onChange={ e => { setDescription(e.target.value) } }
                        />
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <p className="text-2xl font-bold">Salary:</p>
                        <input 
                            className="p-3 text-blue-950 placeholder-blue-300 border-2 border-blue-300 rounded-xl bg-transparent caret-blue-300" 
                            placeholder="Username" value={ salary } onChange={ e => { setSalary(e.target.value) } } 
                        />
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <p className="text-2xl font-bold">Email:</p>
                        <input 
                            className="p-3 text-blue-950 placeholder-blue-300 border-2 border-blue-300 rounded-xl bg-transparent caret-blue-300" 
                            placeholder="Username" value={ email } onChange={ e => { setEmail(e.target.value) } } 
                        />
                    </div>
                    <button className="p-3 text-blue-50 text-center font-bold bg-blue-400 rounded-xl" onClick={ () => { handleCreateJob() } } >
                        Create This Job
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateJobs