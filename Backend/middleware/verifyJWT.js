import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {

    console.log("Authorization Header:", req.headers.authorization);

    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        });

    }

};