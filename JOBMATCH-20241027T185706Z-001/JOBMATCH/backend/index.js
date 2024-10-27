import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bcrypt from 'bcrypt'

import Account from './models/account.js'
import Job from './models/job.js'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 8000

const dbURI = 'mongodb+srv://username:fuQVgKCWuSomdSvj@cluster0.xk8bl7n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI)
    .then(() => { 
        app.listen(PORT, () => {
            console.log('Connected to backend.')
        })
    })
    .catch(err => {
        console.log(err) 
        console.log('Connection error') 
    })

app.post('/create-account', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const accountType = req.body.accountType

    const account = new Account({
        username: username,
        password: password,
        accountType: accountType
    })

    try {
        account.save()
            .then(() => {
                return res.status(201).json({ message: 'Account created.' })
            })
            .catch(() => {
                return res.status(202).json({ message: 'Username exists.' })
            })

    } catch(err) {
        console.log("Internal server error.")
        return res.status(500).json({ message: 'Internal server error.', err })
    }
})

app.get('/log-in', async (req, res) => {
    const username = req.query.username
    const password = req.query.password
    console.log(req.query)
    try {
        Account.findOne({ username: username })
            .then(account => {        
                if (!account) {
                    return res.status(202).json({ message: 'User not found.' })
                }
      
                bcrypt.compare(password, account.password)
                    .then(isPasswordValid => {
                        console.log(isPasswordValid)
                        if (!isPasswordValid) {
                            return res.status(202).json({ message: 'Incorrect username or password.' })
                        }

                        return res.status(200).json({ message: 'User signed in.', payload: { accountType: account.accountType } })
                    })
                    .catch(err => {
                        console.error('Password comparison error')
                        return res.status(500).json({ message: 'Internal server error.', err })
                    })
            })

    } catch(err) {
        console.log("Internal server error.")
        return res.status(500).json({ message: 'Internal server error.', err })
    }
})

app.post('/create-job', async (req, res) => {
    const username = req.body.username
    const title = req.body.title
    const description = req.body.description
    const salary = req.body.salary
    const email = req.body.email

    const job = new Job({
        username: username,
        title: title,
        description: description,
        salary: salary,
        email: email
    })

    try {
        job.save()
            .then(() => {
                return res.status(201).json({ message: 'Job created.' })
            })
            .catch(() => {
                return res.status(202).json({ message: 'Job not created.' })
            })

    } catch(err) {
        console.log("Internal server error.")
        return res.status(500).json({ message: 'Internal server error.', err })
    }
})

app.get('/show-jobs', async (req, res) => {
    try {
        Job.find().sort({ createdAt: -1 })
            .then(jobs => {        
                if (!jobs) {
                    return res.status(202).json({ message: 'No jobs found.' })
                }

                return res.status(200).json({ payload: jobs, message: 'Jobs found.' })
            })

    } catch(err) {
        console.log("Internal server error.")
        return res.status(500).json({ message: 'Internal server error.', err })
    }
})

app.get('/show-my-jobs', async (req, res) => {
    const username = req.query.username

    try {
        Job.find({ username: username }).sort({ createdAt: -1 })
            .then(jobs => {        
                if (!jobs) {
                    return res.status(202).json({ message: 'No jobs found.' })
                }

                return res.status(200).json({ payload: jobs, message: 'Jobs found.' })
            })

    } catch(err) {
        console.log("Internal server error.")
        return res.status(500).json({ message: 'Internal server error.', err })
    }
})

app.post('/change-password', async (req, res) => {
    const username = req.body.username
    const newPassword = req.body.newPassword

    try {
        const user = await Account.findOne({ username })

        if (!user) {
            return res.status(202).json({ message: 'User not found.' })
        }

        user.password = newPassword

        await user.save()

        return res.status(200).json({ message: 'Password Changed.' })
    } catch(err) {
        console.log("Internal server error.")
        return res.status(500).json({ message: 'Internal server error.', err })
    }
})
