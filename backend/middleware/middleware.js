//bring dotenv
import dotenv from 'dotenv';
dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

const adminAuth = (req,res,next) => {
    //get emain and pass from request
    const { email, password } = req.body;
    //check if email and pass are correct
    if (email === adminEmail && password === adminPassword) {
        next();
    } else {
        console.log("Admin Authentication error: not authorized to be Admin"); 
        //throw error 
        throw new Error("Not authorized to be admin");
        res.status(401).json({message: "Not authorized"});
    }
};

export default adminAuth;
