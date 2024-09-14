
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const  userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save',async function(next){
    const person = this;
    if(!person.isModified('password'))return next();
    try{
        const genSalt = await bcrypt.genSalt(10);
        const hasPass = await bcrypt.hash(person.password,genSalt);
        person.password = hasPass;
        next();
    }catch(err){
        console.log("Not gen slat");
        next(err);
    }
})
userSchema.methods.comparePassword =async function(pss){
    try{
        const isMatch = await bcrypt.compare(pss,this.password);
        return isMatch;
    }catch(err){
        console.log("Not compare");
        throw err;
    }
}
const User = mongoose.model('User', userSchema);

export default User;