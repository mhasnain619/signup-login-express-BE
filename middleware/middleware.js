import jwt from 'jsonwebtoken';

export const tokenVerification = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            console.log(token);

            var verify = jwt.verify(token, process.env.JWT_SECRET_KEY)
            if (verify) {
                next()
            } else {
                res.status(401).json({ message: "token unAuthorized" })
            }
        } else {
            res.status(401).json({ message: "No token provided" })
        }

    } catch (error) {
        res.status(401).json({ message: error })
    }
}