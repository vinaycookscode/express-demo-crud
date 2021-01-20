import { IUserInterface } from "../../interfaces/user.interface";
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.TOKEN_SECRET

export class JwtHandler {
    static createJwtToken(userInformation: IUserInterface) {
        return jwt.sign(JSON.parse(JSON.stringify(userInformation)), SECRET_KEY, {expiresIn: 18000});
    }

    static isTokenExpired(inputToken) {
        return jwt.verify(inputToken, SECRET_KEY);
    }

    static decodeJwtToken(inputToken) {
        if (inputToken) {
            return jwt.decode();
        }
        return null;
    }

}