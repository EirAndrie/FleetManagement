import { Request, Response } from "express";
import { createUserService } from "../service/userService";

export async function createUser(req: Request, res: Response) {
    try {
        const result = await createUserService(req.body);
        res.status(201).json(result)
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}