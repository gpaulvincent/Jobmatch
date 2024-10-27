import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const accountSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    accountType: {
        type: String,
        require: true,
        default: 'Applicant'
    }
})

accountSchema.pre('save', function(next) {
    const user = this
    if (!user.isModified('password')) return next()

    bcrypt.hash(user.password, 8, (err, hash) => {
        if (err) return next(err)
        console.log(hash)
        user.password = hash
        next()
    })
})

const Account = mongoose.model('Account', accountSchema)
export default Account