
import jwt from "jsonwebtoken";
import dotenv from "dotenv";





dotenv.config();

const auth = {
    verifyToken: async (req, res, next) => {
        
        try {
            //get the token from the request headers
            //const token = req.headers.authorization;

            const token = req.cookies.token;
            
            //if token is not present, return an error
            if (!token) {
                return res.status(401).json({ message: "Token is missing" });
            }

          

            //if token is present, verify the token
            try {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

                //add the decoded token to the request object
                req.id = decodedToken.id;
                
                

                next();
            } catch (error) {
                return res.status(401).json({ message: "token is not valid" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error in verifying token" });
        }
    },



   
     }
    
    


export default auth;