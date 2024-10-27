import mongoose from 'mongoose'

const Schema = mongoose.Schema

const jobSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    salary: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }
}, { timestamps: true })

const Job = mongoose.model('Job', jobSchema)
export default Job