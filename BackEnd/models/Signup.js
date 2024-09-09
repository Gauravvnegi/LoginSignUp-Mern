import mongoose from 'mongoose';

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

createSignUp.pre('save', function(next) {
    if (this.password !== this.confirmPassword) {
        return next(new Error('Passwords do not match.'));
    }
    next();
});

const SignUp = mongoose.model('SignUp', createSignUp);
export default SignUp;
