const jwt = require("jsonwebtoken");

async function authorization(req, res, next) {
    try {
        const token = await req.headers.authorization.split(" ")[1];      // extract token from request header.
        const decodedToken = await jwt.verify(token, process.env.SECRETKEY);  // match the token's secret received with out secret key.
        const user = await decodedToken;                                      // get the user from the decodedToken
        req.user = user;                                                  // pass the user into the request from next middleware.
        console.log("Authorization Successfull.");
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({error: new Error("Invalid Request.")});         // if any steps fails above then we treat request as forbidden and doesn't let it access the api.
    }
}

module.exports = authorization;