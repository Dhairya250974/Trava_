const jwt = require("jsonwebtoken")
const User = require("../models/User")


const verifyToken = (req, res, next) => {

    try{
        const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1]  || req.body.accessToken;

        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Unauthorized Access' 
            });
        }

        try{
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            console.log(payload);

            req.id = payload.id;
            req.role = payload.role;

            

            
            // Continue to the next middleware ye kaam complete ho gaya h hamara
        
        } 
        catch (error) {
            console.error({
                message: "JWT error occured"
            });
            return res.status(401).json({ 
                success: false,
                message: 'Invalid token' 
            });
        }

        next(); //ye 

    }
    catch(error){
        return res.status(401).json({ 
                success: false,
                message: 'SomeThing went wrong' 
            });
    }

    
};

const verifyUser = (req, res, next) => {
    try{
        const userId = req.id;
        const paramsId = req.params.id
        const role = req.role;
              
        if(paramsId === userId || role === 'user'){
            next()
        }
        else{
            res.status(401).json({
                success: false, 
                message: "You're not Authorized"
            })
        }    
    }
    catch(error){
        res.status(500).json({
            success: false, 
            message: "User Cannot be verified"
        })
    }
}

const verifyAdmin = (req, res, next) => {
    try{
        const role = req.role;

        if(role === 'admin'){
            next()
        }
        else{
            res.status(401).json({
                success: false, 
                message: "You're not Authorized"
            })
        }

    }
    catch(error){
        return res.status(401).json({
            success: false, 
            message: "User Cant be verified"
        })
    }
}

module.exports = {verifyToken, verifyAdmin, verifyUser};