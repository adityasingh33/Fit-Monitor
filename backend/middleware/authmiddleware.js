// import jwt from "jsonwebtoken";
// import User from "../models/user.js";

// const protect = async (req, res, next) => {
//     try {
//         let token;
        
//         console.log("Auth Header:", req.headers.authorization);

//         if (req.headers.authorization?.startsWith("Bearer")) {
//             token = req.headers.authorization.replace(/["']/g, '').split("Bearer")[1].trim();
//             console.log("Extracted Token:", token);

//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             console.log("Decoded Token:", decoded);

//             // Find user and explicitly set both _id and id
//             const user = await User.findById(decoded.id || decoded.userId).select("-password");
            
//             if (!user) {
//                 return res.status(401).json({ message: "User not found" });
//             }

//             // Set both _id and id for compatibility
//             req.user = {
//                 _id: user._id,
//                 id: user._id,
//                 name: user.name,
//                 email: user.email
//             };
            
//             next();
//         } else {
//             res.status(401).json({ 
//                 message: "Not authorized, no token",
//                 received: req.headers.authorization 
//             });
//         }
//     } catch (error) {
//         console.error("Auth Error:", error);
//         res.status(401).json({ 
//             message: "Not authorized", 
//             error: error.message 
//         });
//     }
// };

// export default protect;


import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res, next) => {
    try {
        // Check for auth header
        if (!req.headers.authorization?.startsWith("Bearer")) {
            return res.status(401).json({ 
                message: "Not authorized, no token" 
            });
        }

        // Extract and verify token
        const token = req.headers.authorization.split("Bearer")[1].trim();
        console.log("Processing token:", token);

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token:", decoded);
        } catch (jwtError) {
            if (jwtError.name === 'TokenExpiredError') {
                return res.status(401).json({
                    message: "Token expired",
                    error: "jwt expired"
                });
            }
            throw jwtError;
        }

        // Find user and attach to request
        const user = await User.findById(decoded.id || decoded.userId)
            .select("-password");
        
        if (!user) {
            return res.status(401).json({ 
                message: "User not found" 
            });
        }

        req.user = {
            _id: user._id,
            id: user._id, // For compatibility
            name: user.name,
            email: user.email
        };
        
        next();
    } catch (error) {
        console.error("Auth Error:", error);
        res.status(401).json({ 
            message: "Authentication failed", 
            error: error.message 
        });
    }
};

export default protect;