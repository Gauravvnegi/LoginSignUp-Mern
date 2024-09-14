import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const createSignUp = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
});

createSignUp.pre('save', async function(next) {
    if (this.password !== this.confirmPassword) {
        return next(new Error('Passwords do not match.'));
    }
    const person = this;
    if(!person.isModified('password'))return next();
    try{
        const gensalt  = await bcrypt.genSalt(10);
        const hassPass = await bcrypt.hash(person.password, gensalt);
        person.password = hassPass;
        person.con = hassPass;
        next();
    }catch(err){
        console.log(err);
        return next(err);
    }
});

const SignUp = mongoose.model('SignUp', createSignUp);
export default SignUp;
