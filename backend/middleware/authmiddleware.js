import jwt from "jsonwebtoken";

const authmiddleware = (req, res, next) => {
  
    // const token = req.header("Authorization");
    //
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    try {
                                   //.replace("Bearer ", "")
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next(); 
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};


export default authmiddleware;
