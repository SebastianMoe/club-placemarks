import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { dataBase as db } from "../model/db.js";

dotenv.config();

export function createToken(user: any) {
    const payload = {
        id: user._id,
        email: user.email,
    };
    const options: SignOptions = {
        algorithm: "HS256",
        expiresIn: "1h",
    };
    return jwt.sign(payload, process.env.COOKIE_PASSWORD!, options);
}

export function decodeToken(token: string) {
    const userInfo: any = {};
    try {
        const decoded = jwt.verify(token, process.env.COOKIE_PASSWORD!) as jwt.JwtPayload;
        userInfo.userId = decoded.id;
        userInfo.email = decoded.email;
    } catch (e) {
        return null;
    }
    return userInfo;
}

export async function validate(decoded: any, request: any, h: any) {
    const user = await db.userStore.getById(decoded.id);
    if (!user) {
        return { isValid: false };
    }
    return { isValid: true, credentials: user };
}