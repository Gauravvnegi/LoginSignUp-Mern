import jwt from 'jsonwebtoken'

const jwtAuthMiddleWare = (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'Token is required'});
    }
    try{
        const decode = jwt.verify(token,'abc');
        req.user = decode;
        next();
    }catch(e){
        return res.status(401).json({message: 'Token is invalid'});
    }
}
const generateToken = (userData)=>{
    return jwt.sign(userData , 'abc',{ expiresIn: '30s' });
}
export {jwtAuthMiddleWare ,generateToken};