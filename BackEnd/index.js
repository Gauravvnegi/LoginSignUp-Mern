import express from 'express';
import connectToDatabase from './db.js';
import User from './models/Login.js'; 
import SignUp from './models/Signup.js';
import cors from 'cors';
import {jwtAuthMiddleWare ,generateToken} from './jwtToken.js'
const app = express();



app.use(express.json());

app.use(cors());
connectToDatabase();


app.post('/api/checkUser', async (req, res) => {
    const {username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username: username });
        
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(existingUser.password === password){
            const payload={
            id:existingUser.id,
            username: existingUser.username
        }
         const token = generateToken(payload);

            return res.json({ token ,message: 'Login successful' });
        }
        else{
            return res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/signup', async (req, res) => {
    const {username, password ,email ,confirmPassword} = req.body;

    try{
        const existingUser = await User.findOne({ username: username});
        if(existingUser){
            return res.status(409).json({ message: 'User already exists' });
        }
        const newUser = new SignUp({
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });
        const saveData = await newUser.save();
       const loginData = new User({
            username: username,
            password: password
        });

        const saveLoginData = await loginData.save();
        const payload={
            id:saveData.id,
            username: saveLoginData.username
        }
        const token = generateToken(payload);
        console.log(token);

        res.status(200).json({message: "user saved successfully" , token: token});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

app.get('/', jwtAuthMiddleWare ,async(req,res)=>{
    try {
        
        const users = await User.find({});
        
        
        res.status(200).json(users);
        console.log(users);
    } catch (err) {

        res.status(500).json({ error: err.message });
    }
});
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
