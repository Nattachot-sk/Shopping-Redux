const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");

        if (!token) {
            return res.status(400).json({ message: "ไม่มี token" });
        }

        const decoded = jwt.verify(token, "jwtsecret");

        req.user = decoded; // คุณสามารถเก็บข้อมูลผู้ใช้ใน req.user ได้

        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "token เสีย" });
    }
};
const authAdmin = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");

        if (!token) {
            return res.status(400).json({ message: "ไม่มี token" });
        }

        const decoded = jwt.verify(token, "jwtsecret");

        req.user = decoded; // คุณสามารถเก็บข้อมูลผู้ใช้ใน req.user ได้

        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "token เสีย" });
    }
};

module.exports = {
    auth,
    authAdmin
}